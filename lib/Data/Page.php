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
     * Table name
     * @var string
     */
    protected $name = 'page';

    /**
     * Primary key
     * @var string
     */
    protected $primary = 'id';
}