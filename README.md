# NTFJ
A minimalistic and hard-to-use esolang, NTFJ is a stack-based language that implements a few commands intrinsic to logic. The name comes from the first letters of the original four commands: `NAND`, `TRUE`, `FALSE`, `JUMP`.

## Commands

 * `|` - `NAND` - pops two values `A` and `B` and pushes `A NAND B`; if `A` and `B` are both bits, it pushes `1-(A&B)`; otherwise, it pushes `255-(A&B)`.
 * `~` - `FALSE` - pushes `0` to the stack.
 * `#` - `TRUE` - pushes `1` to the stack.
 * `^` - `JUMP` - pops `N`, and moves the index pointer to the `N`th command.
 * `*` - `OUT` - pops `N`, and outputs the character whose char code is `N`.
 * `@` - `BYTE` - pops eight values `V1...V8` and pushes the number `V1*(2^8) + ... + V8*(2^1)`.
 * `(` - `PEEK` - if the top value of the stack is zero, jumps to the next `)`. (Nested loops are not supported as of now.)
 * `)` - `ENDPEEK` - marks the point at which to continue for zero values.
 * `$` - `DROP` - drops the top value of the stack.
 * `:` - `DUP` - duplicates the top value of the stack.
 * `/` - `LENGTH` - pushes the number of items in the stack.
 * `` ` `` - debugging tool; logs the state of the stack to the console.

## Computational class
It is conjectured that NTFJ is Turing-Complete with a strong body of evidence to support this claim. Also conjectured is that the original 4-byte is Turing-Complete, but it is unknown.

## Minification

Let us try to remove as many commands as we can! First, we can remove `~` and `#` and replace it with (say) `&`. Let us have `&` push some values. What should those values be? For an `&` that pushes `0` then `1`, `#` is equivalent to `&|`, as `0|1=1`; `#~` is equivalent to `&|&|&||` and `~~` is equivalent to `&&||`. I do not believe that it is possible to represent a single `~`, which _shouldn't_ be a problem, but it may be.

Another choice for `&` is for it to push `1` then `1` i.e. two `1`s. Thus, `~` is equivalent to `&|` and `#` is equivalent to `&|&||`. This seems better for instances in which single placings are necessary, but are (of course) longer than the previously mentioned method. For the sake of completion, I will pursue this definition of `&`.
