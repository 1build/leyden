# Table

Leyden builds upon Slate's schema definition system, providing an interface for users to define table-shaped schemas with powerfully customization cells. The rules which all user-defined Leyden schemas adhere to are listed below, followed by an example model.

* The **Editor** contains a single child, which is a **Table** node (instead of the **Editor** containing any number of **Descendant** nodes).
* A **Table** node (which is extended from the **Element** node) contains one or more children, each of which is a **Cell** node. Additionally, it contains the numeric columns property, which allows table cells to be structured as a fixed-width grid.
* Each **Cell** node (also extended from the **Element** node) contains one or more children, each of which is a **Descendant** node. The **Cell** node type is generic - a **Cell**'s `CellType` is expressed as its type property and indicates the presence of user-defined `CellType`-specific properties. Users of Leyden can even specify the types of children that a **Cell** can contain.

```
          Editor
            :
            :
          Table
        .` : : `.
      .`  :   :  `.
   Cell Cell Cell Cell
    :    : :   :    :
    :   :   :  :    :
User-Defined Cell Children
```
