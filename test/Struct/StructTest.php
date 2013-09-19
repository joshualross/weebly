<?php
use lib\Struct\Struct;

/**
 * Test the lib\Struct\Struct class
 * @author Joshua Ross <joshualross@gmail.com>
 */
class StructTest extends PHPUnit_Framework_TestCase
{
    /**
     * Test mark success
     * @test
     */
    public function markSuccess()
    {
        $struct = new Struct();
        $this->assertTrue($struct->markSuccess()->_success);
    }

    /**
     * Test mark error
     * @test
     */
    public function markError()
    {
        $message = 'error message';
        $struct = new Struct();
        $struct->markError($message);
        $this->assertFalse($struct->markError($message)->_success);
        $this->assertEquals($message, $struct->_error);
    }

    /**
     * Test toJSON
     * @test
     */
    public function toJSON()
    {
        $struct = new Struct();
        $struct->markSuccess();
        $this->assertTrue(false !== json_decode($struct->toJSON()));
    }

    /**
     * Test that initial values are set
     * @test
     */
    public function construct()
    {
        $values = array('_error' => 'foobar', '_success' => true);
        $struct = new Struct($values);
        foreach ($values as $key => $value)
            $this->assertEquals($value, $struct->{$key});
    }
}
