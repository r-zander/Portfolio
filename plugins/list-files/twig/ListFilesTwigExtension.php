<?php
namespace Grav\Plugin;

use \Grav\Common\Grav;
use Grav\Common\Utils;
use FilesystemIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RegexIterator;

class ListFilesTwigExtension extends \Twig_Extension
{

    /** @const Regex to match just everything */
    const DEFAULT_REGEX = '/.*/';

    /**
     * Returns extension name.
     *
     * @return string
     */
    public function getName()
    {
        return 'ListFilesTwigExtension';
    }

    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('listfiles', [$this, 'listfiles'])
        ];
    }

    /*
     * Code basically copied from Assets->addDir
     */
    public function listfiles($directory, $pattern = self::DEFAULT_REGEX)
    {
        $grav = Grav::instance();
        $root_dir = rtrim(ROOT_DIR, '/');

        // Check if $directory is a stream.
        if (strpos($directory, '://')) {
            $directory = self::$grav['locator']->findResource($directory, null);
        }


        $path = $root_dir . DIRECTORY_SEPARATOR . $directory;

        if (file_exists($path) == false) {
            $grav['debugger']->addMessage("WARNING: Could not find '" . $directory . "'");
            return [];
        }

        // Get files
        $files = $this->rglob($path, $pattern, $root_dir . '/');

        foreach ($files as &$file) {
            $file = $grav['base_url'] . "/" . str_replace("\\", "/", $file);
        }

        return $files;
        // return [];
    }

    /**
     * Recursively get files matching $pattern within $directory.
     *
     * @param  string $directory
     * @param  string $pattern (regex)
     * @param  string $ltrim   Will be trimmed from the left of the file path
     *
     * @return array
     */
    protected function rglob($directory, $pattern, $ltrim = null)
    {
        $iterator = new RegexIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory,
            FilesystemIterator::SKIP_DOTS)), $pattern);
        $offset = strlen($ltrim);
        $files = [];

        foreach ($iterator as $file) {
            $files[] = substr($file->getPathname(), $offset);
        }

        return $files;
    }
}
