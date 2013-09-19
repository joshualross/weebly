<?php
namespace lib\Data;

use lib\Data\Data;

/**
 * CRUD for element_type table
 * @author Joshua Ross <joshualross@gmail.com>
 */
class ElementType extends Data
{
    /**
     * Table name
     * @var string
     */
    protected $name = 'element_type';

    /**
     * Primary key
     * @var string
     */
    protected $primary = 'id';
}