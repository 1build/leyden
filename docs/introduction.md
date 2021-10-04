# Introduction

[Leyden][leyden-repo] is a data table framework powered by [Slate][slate].

Leyden lets you build complex tables for viewing and editing your data, your way. It's just a thin, table-shaped wrapper on top of Slate. Leyden doesn't abstract Slate away from you; its power and flexibility of Slate are always in reach. It's possible (and highly recommended) to use Slate directly within Leyden tables.

Slate inspired almost every aspect Leyden, including its API, package structure, and type system. If you have a question that isn't answered by these docs, there's a good chance you can find an answer in [Slate's documentation][slate-docs]. It's an excellent resource to keep on hand while working with Leyden.

## Features

* **Table layout.** Define your table dimensions, pass in your cells, and Leyden handles the rest with CSS grids.
* **Coordinate system.** Leyden's coordinate system is simple and fully interoperable with Slate's `Path` system.
* **Cross-cell data access.** Cells can access data from other cells using absolute coordinates _and_ relative positions.
* **Awesome types.** Leyden's type system is both safe and powerful. It takes user-defined types to the next level, transforming and utilizing them tacross the library.
* **Data validators.** Leyden exposes several pre-built validators (such as `numeric` and `integer`) for your cell data. You can define custom validators, too!
* **Simple rendering.** Slate requires users to define complicated render functions to detect different types of elements. Leyden handles this automatically.

[leyden-repo]: https://github.com/1build/leyden
[slate]: http://slatejs.org
[slate-docs]: https://docs.slatejs.org/
