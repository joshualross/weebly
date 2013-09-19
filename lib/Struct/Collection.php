<?php
namespace lib\Struct;

use lib\Struct\Struct;
use \IteratorAggregate;
use \Countable;
use \ArrayAccess;
use \ArrayIterator;

/**
 * Base Collection object, collection of structs
 * @author Joshua Ross <joshualross@gmail.com>
 */
class Collection extends Struct implements IteratorAggregate, Countable, ArrayAccess
{
    /**
     * Holds structs
     * @var array
     */
    public $_rows = array();

    /**
     * Construct - optionally takes array of Structs
     * @param array
     * @return type
     */
    public function __construct(array $initialValues=array())
    {
        foreach ($initialValues as $key => $struct)
        {
            if ($struct instanceof Struct)
                $this[$key] = $struct;
        }
    }

    /**
     * @param mixed $offset
     * @return lib\struct\Struct
     */
    public function offsetExists($offset)
    {
        if (isset($this->_rows[$offset]))
            return true;

        return false;
    }

    /**
     * @param offset
     * @return lib\struct\Struct
     */
    public function offsetGet($offset)
    {
        if ($this->offsetExists($offset))
            return $this->_rows[$offset];

        return null;
    }

    /**
     * @param mixed $offset
     * @param lib\struct\Struct $value
     * @return lib\struct\collection\Collection
     */
    public function offsetSet($offset, $value)
    {
        if (null === $offset)
            $this->_rows[] = $value;
        else
            $this->_rows[$offset] = $value;
        return $this;
    }

    /**
     * @param offset
     * @return lib\struct\collection\Collection
     */
    public function offsetUnset ($offset)
    {
    	unset($this->_rows[$offset]);
        return $this;
    }

    /**
     * @return \ArrayIterator
     */
    public function getIterator()
    {
        return new ArrayIterator($this->_rows);
    }

    /**
     * @return integer
     */
    public function count()
    {
        return count($this->_rows);
    }

    /**
     * Return the keys of the collection
     * @return array
     */
    public function keys()
    {
        return array_keys($this->_rows);
    }

    /**
     * Return the struct as json object
     *
     * @return string
     */
    public function toJSON()
    {
        $data = array();
        foreach ($this->_rows as $key => $struct)
        {
            $data[] = $struct->toArray();
        }

        return json_encode($data);
    }

    /**
     * Sort the collection by keys
     * @return lib\struct\collection\Collection
     */
    public function ksort()
    {
        ksort($this->_rows);
        return $this;
    }

    /**
     * Sort the collection by user defined function
     * @param function $comparator
     * @return lib\struct\collection\Collection
     */
    public function usort($comparator)
    {
        usort($this->_rows, $comparator);
        return $this;
    }

    /**
     * Sort the collection by user defined function
     * @param function $comparator
     * @return lib\struct\collection\Collection
     */
    public function uasort($comparator)
    {
        uasort($this->_rows, $comparator);
        return $this;
    }
}