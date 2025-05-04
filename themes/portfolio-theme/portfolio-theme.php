<?php
namespace Grav\Theme;

use Grav\Common\Theme;
use Twig\TwigFilter;

class PortfolioTheme extends Theme
{
    public static function getSubscribedEvents()
    {
        return [
            'onTwigExtensions' => ['onTwigExtensions', 0],
        ];
    }

    public function onTwigExtensions()
    {
        $this->grav['twig']->twig()
            ->addFilter(new TwigFilter('duration', [$this, 'durationFilter']));
        $this->grav['twig']->twig()
            ->addFilter(new TwigFilter('yearsSince', [$this, 'yearsSince']));
    }

    /**
     * Return full years since $value (timestamp | string | DateTimeInterface)
     */
    public function yearsSince($value): int
    {
        // normalise input → DateTimeImmutable
        if ($value instanceof \DateTimeInterface) {
            $created = \DateTimeImmutable::createFromInterface($value);
        } elseif (is_numeric($value)) {                 // Grav stores page.date as Unix timestamp
            $created = (new \DateTimeImmutable)->setTimestamp($value);
        } else {
            $created = new \DateTimeImmutable($value); // falls back to parsing a date string
        }

        return (new \DateTimeImmutable)->diff($created)->y;   // full-year component of the interval
    }

    public function durationFilter($start, $end = 'now'): string
    {
        $a = new \DateTimeImmutable(is_numeric($start) ? "@$start" : $start);
        $b = new \DateTimeImmutable($end === 'now' ? 'now' : $end);
        $d = $b->diff($a);

        return "{$d->y} year" . ($d->y==1 ? '' : 's')
            . ", {$d->m} month" . ($d->m==1 ? '' : 's');
    }
}
