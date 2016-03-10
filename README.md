# NTFJ
A minimalistic and hard-to-use esolang, NTFJ is a stack-based language that implements a few commands intrinsic to logic. The name comes from the first letters of the original four commands: `NAND`, `TRUE`, `FALSE`, `JUMP`.

## Commands

 * `|` - `NAND` - pops two values `A` and `B` and pushes `A NAND B`; if `A` and `B` are both bits, it pushes `1-(A&B)`; otherwise, it pushes `255-(A&B)`.
 * `~` - `FALSE` - pushes `0` to the stack.
 * `#` - `TRUE` - pushes `1` to the stack.
 * `^` - `JUMP` - pops `N`, and moves the index pointer to the `N`th command.
 * `*` - `OUT` - pops `N`, and outputs the character whose char code is `N`.
 * `@` - `BYTE` - pops eight values `V1...V8` and pushes the number `V1*(2^8) + ... + V8*(2^1)` OR, if `V1 > 1`, pushes the bits in that number.
 * `(` - `PEEK` - if the top value of the stack is zero, jumps to the next `)`. (Nested loops are not supported as of now.)
 * `)` - `ENDPEEK` - marks the point at which to continue for zero values.
 * `$` - `DROP` - drops the top value of the stack.
 * `:` - `DUP` - duplicates the top value of the stack.
 * `/` - `LENGTH` - pushes the number of items in the stack.
 * `{` - `ROTATE` - pops N; shifts the stack and pushes it to the front N times.
 * `}` - `REV ROTATE` - pops N; pops from the stack and unshifts it N times.
 * `` ` `` - debugging tool; logs the state of the stack to the console.

## Computational class

Let us consider the Turing-complete language [Etre](http://esolangs.org/wiki/Etre); we shall try to translate NTFJ to Etre. A simple enough task, as it seems: `#}` is roughly equivalent to `-` and some combination of `:|` and `()` could be used to emulate `()`. Roughly, `()` in Etre is `:|(<inner><index>^)`.

## Mnemonics
(We will denote the stack's top element as `B`, and the second-to-top element as `A`.)

 * Negate top of stack: `:|`.
   * (start) `A B`.
   * (`:`) `A B B`.
   * (`|`) `A (B NAND B)` = `A (NOT B)`.
 * Conjunction (and): `|:|`.
   * (start) `A B`.
   * (`|`) `A NAND B`.
   * (`:|`) `NOT(A NAND B)` = `A AND B`.
 * Disjunction (or): `:|%:||`
   * Because `A OR B = (NOT A) NAND (NOT B)`.

## Minification

Let us try to remove as many commands as we can! Let us remove the non-essentials. Thus, our set becomes `~ # | ^ ( ) $ : @ * %`, a set of 11 symbols.

Observe that (F, &uarr;) is a logically complete set. As thus, `#` can be eliminated, yielding `# = ~~|`.

After some work, one can observe that `$` is equivalent to `::|||:|`. See:

    ( )  A B C
    (:)  A B C C
    (:)  A B C C C
    (|)  A B C (NOT C)
    (|)  A B (C NAND NOT C)
     =   A B 1
    (|)  A (B NAND 1)
    (:|) A NOT (B NAND 1)

Here is a truth table:

| B | B NAND 1 | NOT (B NAND 1) |
|:-:|:--------:|:--------------:|
| 1 |     0    |        1       |
| 0 |     1    |        0       |

(This also yields a nice identity function, `#:||`.)

