const EZS_SAMPLES = {
"01_Micro_Grad": `
// 1セル内グラデーションのデモ
clear
echo "Rendering 1-cell gradients..."
set y 0
loop ($y < $SYS_H) {
  set x 0
  loop ($x < $SYS_W) {
    locate $x $y
    grad #0000FF #FFA500
    set x calc($x + 1)
  }
  set y calc($y + 1)
  wait 1
}`,

"02_Calc_Pro": `
clear
echo "=== Calculation Engine ==="
set a 10
set b 20
set c calc($a + $b)
echo $a + " + " + $b + " = " + $c
set msg "Result is " + calc($c * 2)
echo $msg
set r rand(100)
echo "Random: " + $r`,

"03_RPG_Battle": `
clear
draw_slime.ezs {
  color #00ff00
  draw 69F9F966
}
echo "A Wild Slime appears!"
ezs draw_slime
locate 0 15
input cmd "1:Attack 2:Magic"
if ($cmd == 1) {
  echo "You slash the slime!"
  color #ff0000
  locate 0 1
  draw FFFFFFFF
  wait 100
  clear 1
}`,

"04_FizzBuzz": `
clear
set i 1
loop ($i <= 30) {
  set res ""
  if (calc($i % 3 == 0)) { set res "Fizz" }
  if (calc($i % 5 == 0)) { set res $res + "Buzz" }
  if ($res == "") { set res $i }
  put $res + " "
  set i calc($i + 1)
  wait 10
}`,

"05_Matrix": `
clear
color #00FF00
loop (1) {
  locate rand($SYS_W) rand($SYS_H)
  put rand(2)
  wait 10
}`,

"06_Line_Command": `
clear
line 0 "SYSTEM STATUS: OK"
line 2 "----------------"
line 5 "LOADING DATA..."
wait 1000
line 5 "DATA LOADED."`,

"07_Color_Test": `
clear
color red
echo "RED TEXT"
color blue
echo "BLUE TEXT"
color #FFFF00
echo "HEX YELLOW"`,

"08_Bouncer": `
clear
set x 0
set y 5
set dx 1
loop (1) {
  color black
  locate $x $y
  put " "
  set x calc($x + $dx)
  if ($x > 20) { set dx -1 }
  if ($x < 1) { set dx 1 }
  color yellow
  locate $x $y
  draw 69996000
  wait 50
}`,

"09_Function_Demo": `
header.ezs {
  color cyan
  line 0 "=== FUNCTION TEST ==="
}
clear
ezs header
echo "Function called successfully."`,

"10_Identity": `
clear
input name "Who are you?"
echo "Welcome, " + $name
input age "Age?"
if ($age > 19) { echo "Adult mode." }`,

"11_Logic_Test": `
set a 1
set b 0
if (calc($a && $b == 0)) { echo "Logical AND OK" }`,

"12_Wait_Anim": `
clear
put "Processing"
loop (3) {
  put "."
  wait 500
}
echo " Done!"`,

"13_Scale_Check": `
echo "Width: " + $SYS_W
echo "Height: " + $SYS_H`,

"14_Draw_Modes": `
color #FF00FF
draw FFFFFFFF
put " <- Mask Mode"`,

"15_Math_Complex": `
set x calc((10 + 5) * 2 / 3)
echo "Result: " + $x`,

"16_Clear_Line": `
echo "Row 1"
echo "Row 2"
wait 1000
clear 1
echo "Row 2 deleted"`,

"17_Nested_If": `
set v 10
if ($v > 5) {
  if ($v < 15) { echo "Nested IF works" }
}`,

"18_Emoji_Draw": `
// Heart
color red
draw 69996600
// Sword
color grey
draw 22722270`,

"19_Bit_Pattern": `
echo "Bit test:"
draw 84218421`,

"20_Loop_Break": `
set c 0
loop ($c < 5) {
  echo "Count " + $c
  set c calc($c + 1)
  wait 100
}`,

"21_Final_Demo": `
clear
grad #FF0000 #0000FF
echo "EZS v8.0 READY."
`
};