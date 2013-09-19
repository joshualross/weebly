<?php
namespace lib\Data;

use lib\Data\Data;

/**
 * CRUD for page table
 * @author Joshua Ross <joshualross@gmail.com>
 */
class Page extends Data
{

    /**
     * Return all or a specific page
     * @param integer $id
     * @return array
     */
    public function get(integer $id)
    {
        ;
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
        $query = $this->dbh->prepare("INSERT INTO page (name) VALUES name=:name");
        $query->execute(array('name' => $params['name']));

        $struct->id = $pdo->lastInsertId();

        $struct->markSuccess();
        return $struct;
    }
}