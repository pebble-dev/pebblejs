---
layout: default
---

### Radial

[Radial]: #radial

An [Element] that can display as an arc, ring, sector of a circle depending on its properties are set.

[Radial] has these additional properties:

| Name     |  Type  | Default | Description                                                                                                                             |
| -------- | :----: | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `radius` | number | 0       | Radius of the radial starting from its outer edge. A sufficiently large radius results in a sector or circle instead of an arc or ring. |
| `angle`  | number | 0       | Starting angle in degrees. An arc or sector will be drawn from `angle` to `angle2`.                                                     |
| `angle2` | number | 360     | Ending angle in degrees. An ending angle that is 360 beyond the starting angle will result in a ring or circle.                         |

#### Radial.radius(radius)

Accessor to the `radius` property. See [Radial]

#### Radial.angle(angle)

Accessor to the `angle` starting angle property. See [Radial]

#### Radial.angle2(angle)

Accessor to the `angle2` ending angle property. See [Radial]
