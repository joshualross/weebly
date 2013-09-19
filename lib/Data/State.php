<?php
namespace lib\Data;

use lib\Data\Data;

/**
 * CRUD for page table
 * @author Joshua Ross <joshualross@gmail.com>
 */
class State extends Data
{
    /**
     * Table name
     * @var string
     */
    protected $name = 'state';

    /**
     * Primary key
     * @var string
     */
    protected $primary = 'id';

    /**
     * Cosntructor
     * @param PDO $dbh
     */
    public function __construct(PDO $dbh)
    {
        $this->dbh = $dbh;
    }

    /**
     * Set
     * @param lib\Struct\Struct $struct
     * @return type
     */
    public function put($struct)
    {
        ;
    }

    /**
     * Create
     * @param lib\Struct\Struct $struct
     * @return lib\Struct\Struct
     */
    public function create($struct)
    {
        //create a new struct
        $struct = new Struct($params);
        //@todo need more params, not null is killing me here
        $query = $pdo->prepare("INSERT INTO page (name) VALUES name=:name");
        $query->execute(array('name' => $params['name']));

        $struct->id = $pdo->lastInsertId();

        $struct->markSuccess();
        return $struct;
    }
}