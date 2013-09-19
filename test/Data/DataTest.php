<?php
use lib\Data\Data;
use lib\Struct\Struct;

/**
 * Test the lib\Data\Data
 * @author Joshua Ross <joshualross@gmail.com>
 */
class DataTest extends PHPUnit_Framework_TestCase
{
    /**
     * Data mock object
     * @var DataMock
     */
    public $data = null;

    /**
     * SetUp
     *
     * @return type
     */
    public function setUp()
    {
        $pdo = new PDO('mysql:dbname=weebly;host=127.0.0.1', 'root', '');
        $this->data = new DataMock($pdo);;
    }

    public function tearDown()
    {
        $this->data->cleanup();
    }

    /**
     * Struct data provider
     *
     * @return array
     */
    public function structDataProvider()
    {
        return array(
        	array(new Struct(array('name' => 'foo'))),
        	array(new Struct(array('name' => 'bar'))),
        	array(new Struct(array('name' => 'baz'))),
        );
    }

    /**
     * Create
     * @test
     * @dataProvider structDataProvider
     */
    public function create(Struct $struct)
    {
        $result = $this->data->create($struct);

        $this->assertTrue($result->_success);
        $this->assertTrue(!empty($result->id));
    }

    /**
     * Update
     * @test
     * @depends create
     * @dataProvider structDataProvider
     */
    public function update(Struct $struct)
    {
        $this->create($struct);
        $name = 'changed';
        $struct->name = $name;
        $result = $this->data->update($struct);
        $this->assertTrue($result->_success);
        $this->assertEquals($name, $result->name);
    }

    /**
     * Delete
     * @test
     * @depends create
     * @dataProvider structDataProvider
     */
    public function delete(Struct $struct)
    {
        $this->create($struct);

        $result = $this->data->delete($struct->id);
        $this->assertTrue(false !== $result);
    }


    /**
     * Test the get method
     * @test
     * @depends create
     * @dataProvider structDataProvider
     */
    public function getAll(Struct $struct)
    {
        $this->create($struct);
        unset($struct->id);

        $this->create($struct);
        unset($struct->id);

        $this->create($struct);
        unset($struct->id);

        $results = $this->data->get();

        $this->assertTrue(!empty($results));
    }

}

/**
 * DataMock - concrete implementation of data
 * @author Joshua Ross <joshualross@gmail.com>
 */
class DataMock extends Data
{
    protected $name = 'test';
    protected $primary = 'id';

    public function cleanup()
    {
        $this->dbh->query("DELETE FROM {$this->name}");
    }
}

/**
 * PDO Mock - so we don't hit the db during testing
 * @author Joshua Ross <joshualross@gmail.com>
 */
class PDOMock extends PDO
{
    //@todo override methods to not hit the db
}