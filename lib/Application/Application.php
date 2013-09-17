<?php
namespace lib\Application;

/**
 * An Application - very basic routing etc
 * @author Joshua Ross <joshualross@gmail.com>
 */
class Application
{
    const ROUTE_ERROR = 'error';

    /**
     * Route
     * @var array
     */
    protected $routes = array();

    /**
     * Error handler
     * @var function
     */
    protected $errorHandler = null;


    /**
     * Adds a handler for a specific route
     * @param string $route
     * @return lib\Application\Application
     */
    public function on($route, $handler)
    {
        $this->routes[$route] = $handler;
        return $this;
    }

    /**
     * Error state handler
     * scope param
     * @return type
     */
    public function error($handler)
    {
        $this->routes[self::ROUTE_ERROR] = $handler;
    }

    /**
     * Run the app
     *
     * @return lib\Application\Application
     */
    public function run()
    {
        //very basic route parsing
        $request = $_SERVER['REQUEST_URI'];
        $params  = array();

        //get rid of the query params
        if (false !== strpos($request, '?'))
            list($path, $params) = explode('?', $request, 2);
        else
            $path = $request;

        $path = rtrim($path, '/');

        //basic param handling
        if (!empty($params))
        {
            parse_str($params, $result);
            $params = $result;
        }

        ob_start();

        if (!empty($this->routes[$path]))
            $this->routes[$path]($params);
        else if (!empty($this->routes[self::ROUTE_ERROR]))
            $this->routes[self::ROUTE_ERROR]();

        $output = ob_get_flush();
        if (empty($output))
            $this->routes[self::ROUTE_ERROR]();

        return $this;
    }
}