<?php
namespace lib\Data;

use lib\Data\Data;

/**
 * CRUD for element table
 * @author Joshua Ross <joshualross@gmail.com>
 */
class Element extends Data
{
    /**
     * Table name
     * @var string
     */
    protected $name = 'element';

    /**
     * Primary key
     * @var string
     */
    protected $primary = 'id';
}