<?php
namespace lib\Data;

use lib\Data\Data;

/**
 * CRUD for state table
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
}