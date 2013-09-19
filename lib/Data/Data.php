<?php
namespace lib\Data;

use lib\Struct\Struct;
use lib\Struct\Collection;
use \PDO;

/**
 * CRUD base class
 * @author Joshua Ross <joshualross@gmail.com>
 */
abstract class Data
{
    /**
     * Database handle
     * @var PDO
     */
    protected $dbh = null;

    /**
     * Table name
     * @var string
     */
    protected $name = null;

    /**
     * Primary key
     * @var string
     */
    protected $primary = null;

    /**
     * Cosntructor
     * @param PDO $dbh
     */
    public function __construct(PDO $dbh)
    {
        $this->dbh = $dbh;
    }

    /**
     * Return all or a specific row identified by the id value
     * @param integer $id
     * @return lib\struct\Collection
     */
    public function get($id=null)
    {
        $params = array();

        $query = "SELECT * FROM {$this->name}";
        if (null !== $id) {
            $query .= " WHERE {$this->primary}=:id";
            $params[$this->primary] = $id;
        }

        $results = $this->query($query, $params);
        $collection = new Collection();
        if ($results) foreach ($results as $values) {
            $struct = new Struct($values);
            $collection[$values[$this->primary]] = $struct->markSuccess();
        }

        return $collection;
    }

    /**
     * Update
     * @param lib\Struct\Struct $struct
     * @return lib\Struct\Struct
     */
    public function update(Struct $struct)
    {
        $data = $struct->toArray();
        $query = "UPDATE {$this->name}"
            . " SET";

        foreach ($data as $key => $value)
        {
            if ($key == $this->primary) //no primary key updating
                continue;

            $query .= " {$key}=:{$key}";
        }

        //where
        $query .= " WHERE {$this->primary}=:{$this->primary}";

        $this->query($query, $data);
        return $struct->markSuccess();
    }

    /**
     * Create
     * @param lib\Struct\Struct $struct
     * @return lib\Struct\Struct
     */
    public function create(Struct $struct)
    {
        $data = $struct->toArray();
        $query = "INSERT INTO {$this->name}"
            . " (" . implode(',', array_keys($data)) . ")"
            . " VALUES"
            . " (:" . implode(',:', array_keys($data)) . ")"
            ;


        $this->query($query, $data);
        $struct->{$this->primary} = $this->dbh->lastInsertId();

        if (empty($struct->{$this->primary}))
            return $struct->markError();

        return $struct->markSuccess();
    }

    /**
     * Delete
     * @param integer $id
     * @return boolean
     */
    public function delete($id)
    {
        if (empty($id))
            return false;

        $params = array($this->primary => $id);
        $query = "DELETE FROM {$this->name}"
            . " WHERE {$this->primary}=:{$this->primary}"
            . " LIMIT 1";

        return $this->query($query, $params);
    }

    /**
     * Prepare then execute a query
     * @param string $query
     * @return type
     */
    protected function query($query, array $params=array())
    {
        $query = $this->dbh->prepare($query);
        $result = $query->execute($params);
        if (!$result) {
            //egads, an error
            return false;
        }

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}