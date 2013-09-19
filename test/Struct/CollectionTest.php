<?php
use lib\Struct\Struct;
use lib\Struct\Collection;

/**
 * Test the lib\Struct\Collection class
 * @author Joshua Ross <joshualross@gmail.com>
 */
class CollectionTest extends PHPUnit_Framework_TestCase
{
    /**
     * Return an array of structs
     * param
     * @return type
     */
    public function structDataProvider()
    {
        return array(
        	array(
        	    array(
        	        'foo' => new Struct(array('foo' => true)),
        	        'bar' => new Struct(array('bar' => true)),
        	        'baz' => new Struct(array('baz' => true)),
                ),
            ),
        );
    }

    /**
     * Test offset get
     * @test
     * @param array $structs
     * @dataProvider structDataProvider
     */
    public function constructWithInitialValues($structs)
    {
        $collection = new Collection($structs);
        foreach ($structs as $key => $struct)
            $this->assertTrue($collection->offsetExists($key));
    }

    /**
     * ArrayAccess
     * @test
     * @param array $structs
     * @dataProvider structDataProvider
     */
    public function arrayAccess($structs)
    {
        $collection = new Collection();
        foreach ($structs as $key => $struct)
        {
            $collection[$key] = $struct;
            $this->assertEquals($struct, $collection[$key]);
        }
    }

    /**
     * Test count
     * @test
     * @param array $structs
     * @dataProvider structDataProvider
     */
    public function countMatches($structs)
    {
        $collection = new Collection($structs);
        $this->assertEquals(count($structs), $collection->count());
    }

    /**
     * Test toJSON - importantly, make sure we only json encode the rows
     * @test param
     * @param array $structs
     * @dataProvider structDataProvider
     */
    public function toJSON($structs)
    {
        $data = array();
        foreach ($structs as $key => $struct)
            $data[] = $struct->toArray();
        $expected = json_encode($data);
        $collection = new Collection($structs);
        $this->assertEquals($expected, $collection->toJSON());
    }
}


