### 什么是位运算？

位运算是在数字底层（即表示数字的 32 个数位）进行运算的。由于位运算是低级的运算操作，所以速度往往也是最快的（相对其它运算如加减乘除来说），并且借助位运算有时我们还能实现更简单的程序逻辑,缺点是很不直观，许多场合不能够使用。

> 位运算只对整数起作用，如果一个运算子不是整数，会自动转为整数后再运行。虽然在 JavaScript 内部，数值都是以64位浮点数的形式储存，但是做位运算的时候，是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数。

##### 关于二进制

以下来源于w3shool:  
ECMAScript 整数有两种类型，即有符号整数（允许用正数和负数）和无符号整数（只允许用正数）。在 ECMAScript 中，所有整数字面量默认都是有符号整数，这意味着什么呢？

有符号整数使用 31 位表示整数的数值，用第 32 位表示整数的符号，0 表示正数，1 表示负数。数值范围从 -2147483648 到 2147483647。

可以以两种不同的方式存储二进制形式的有符号整数，一种用于存储正数，一种用于存储负数。正数是以真二进制形式存储的，前 31 位中的每一位都表示 2 的幂，从第 1 位（位 0）开始，表示 20，第 2 位（位 1）表示 21。没用到的位用 0 填充，即忽略不计。例如，下图展示的是数 18 的表示法。  
![image](http://www.w3school.com.cn/i/ct_js_integer_binary_signed_32bits.gif)

以上来源于w3shool:

那在js中二进制和十进制如何转换呢？如下

```

let num = 10;
console.log(num.toString(2));

let num1 = 1001;
console.log(parseInt(num1, 2)); 
```

### js中都有哪些位运算？

-   #### 按位或 |
    

> 对每对比特位执行与（AND）操作。只有 a 和 b 任意一位为1时，a | b 就是 1。如下表9 | 3 = 11

9

\=

1

0

0

1

3

\=

0

0

1

1

11

\=

1

0

1

1

应用场景：

1.  ###### 取整
    

> 对于一般的整数，返回值不会有任何变化。对于大于2的32次方的整数，大于32位的数位都会被舍去。

```
function toInt(num) {
    return num | 0
}
console.log(toInt(1.8))        
console.log(toInt(1.23232))    

```

2.  ###### 边界判断
    

假如我们有一个拖动事件，规定被拖动模块需要在容器内部运动，这时就有边界判断，这其中又包括上，下，左，右四种单一边界，同时还有类似上右，上左等叠加边界，如果我们需要记录这种状态，通过位运算要比使用if判断要简单一些，上右下左四种边界分别用1，2，4，8表示，代码如下：

```
let flag = 0;
if (pos.left < left) flag = flag | 8;
if (pos.right > right) flag = flag | 2;
if (pos.bottom > bottom) flag = flag | 4;
if (pos.top < top) flag = flag | 1;
switch(flag) {
    
    case 1: 
    
    case 2:
    
    case 3:
    
    case 4:
    
    case 6:
    
    case 8:
    
    case 9:
    
    case 12:
    
}
```

> 同理，假如我们有一系列控制开关，通过 a | b | c的形式要比 '{a: true, b: true, c: true}' 简单的多。

-   #### 按位与 &
    

> 对每对比特位执行与（AND）操作。只有 a 和 b 都为1时，a & b 就是 1。如下表9 & 3 = 1

9

\=

1

0

0

1

3

\=

0

0

1

1

1

\=

0

0

0

1

由上表我们可以清晰的看出按位与的计算规则，由此可以引出一系列应用场景

1.  ###### 判断奇偶
    

我们知道奇数的二进制最后一位必然为1，所以任意一个奇数 & 1 一定等于1。

```

return number & 1 === 1
```

2.  ##### 系统权限
    

业务场景：  
我们假设某个管理系统有a, b, c, d四级权限，其中不同帐号分别有不同的权限（可能有1个或多个），例如admin 账户有a + b +c +d 四级权限，guest用户有b + c权限，那这时候应该怎么设计更简单一些呢？

按位与：是时候登场了！

基本思路：  
我们把权限分别用0001, 0010, 0100, 1000表示（即最通俗的1，2，4，8），如果admin用户有a, b, c, d四种权限，则admin的权限为 1 | 2 | 4 | 8 = 15，而guest用户权限为 4 | 8 = 12, 则判断用户是否有某种权限可以如下判断

```
admin & 4 === 4
admin & 8 === 8
admin & 2 === 2
admin & 1 === 1
```

-   #### 按位异或 ^
    

> 对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0。

其运算法则相当于不带进位的二进制加法

9

\=

1

0

0

1

3

\=

0

0

1

1

10

\=

1

0

1

0

应用场景：

1.  ###### 切换变量0和1
    

假如我们通过某个条件来切换一个值为0或者1

```
function update(toggle) {
    num = toggle ? 1 : 0;
}

update(true);



num = num ^ 1;
```

2.  ###### 交换两个变量的值(不用第三个变量)
    

```
let a = 5,
    b = 6;

a = a ^ b;
b = a ^ b;
a = a ^ b;

// 还可以通过运算
a = a + b;
b = a - b;
a = a - b;

// es 6
[a, b] = [b, a]
```

> 原理剖析：a = a ^ b; b = a ^ b 相当与 b = a ^ b ^ b = a ^ (b ^ b) = a ^ 0 = a;

3.  ###### 简单字符串加密
    

```
  const key = 313;
  function encryption(str) {
      let s = '';
      str.split('').map(item => {
        s += handle(item);
      })
      return s;
  }
  
  function decryption(str) {
    let s = '';
    str.split('').map(item => {
        s += handle(item);
    })
    return s;
  }
  
  function handle(str) {
      if (/\d/.test(str)) {
        return str ^ key;
      } else {
        let code = str.charCodeAt();
        let newCode = code ^ key;
        return String.fromCharCode(newCode);
      }
  }

  let init = 'hello world 位运算';
  let result = encryption(init);             
  let decodeResult = decryption(result);     
```

可以看到，我们利用字符串Unicode值的异或运算实现了一个简要的字符串加密效果。

ps: 上面代码仅为演示，实际解密时应该把key及解密密钥传进去。

-   #### 按位非 ～
    

> 对每一个比特位执行非（NOT）操作。NOT a 结果为 a 的反转（即反码）。

ps: 对任一数值 x 进行按位非操作的结果为 -(x + 1)。例如，~5 结果为 -6：

负数存储采用的形式是二进制补码。计算数字二进制补码的步骤有三步：

1.确定该数字的非负版本的二进制表示（例如，要计算 -18的二进制补码，首先要确定 18 的二进制表示）

2.求得二进制反码，即要把 0 替换为 1，把 1 替换为 0（相当于～操作）

3.在二进制反码上加 1

我们可以看到一个数a取负相当于 ~a + 1, 即 -a = ~a + 1, 因此～a = -(a + 1)

应用场景：

1.  ###### 取整 （位运算花样取整）
    

```
~~(-5.88) 
```

2.  ###### 判断数组中某项是否存在
    

```

if (arr.indexOf(item) > -1) {
    
}

if (~arr.indexOf(item)) {
    
}
```

### 按位移动操作符

按位移动操作符有两个操作数：第一个是要被移动的数字，而第二个是要移动的长度。移动的方向根据操作符的不同而不同。

按位移动会先将操作数转换为大端字节序顺序(big-endian order)的32位整数,并返回与左操作数相同类型的结果。右操作数应小于 32位，否则只有最低 5 个字节会被使用。

-   #### 左移 <<
    

> 该操作符会将第一个操作数向左移动指定的位数。向左被移出的位被丢弃，右侧用 0 补充。

例如 3 << 2 的运算图示如下：  
3 = 0000 0000 0000 0000 0000 0000 0000 0011  
12 = 0000 0000 0000 0000 0000 0000 0000 1100

ps: 对任一数值 x 进行左移n, 相当于十进制里的乘以10的倍数，在这儿是指

```
x * 2^n
```

应用场景：

###### rgb和16进制颜色转换

首先我们需要知道RGB与十六进制之间的关系，例如我们最常见的白色RGB表示为rgb(255, 255, 255), 十六进制表示为#FFFFFFF, 我们可以把十六进制颜色除  
‘#’外按两位分割成一部分，即FF,FF,FF, 看一下十六进制的FF转为十进制是多少呢？没错，就是255!

了解了十六进制和RGB关系之后，我们就会发现RGB转十六进制方法就很简单了

1.  将RGB的3个数值分别转为十六进制数，然后拼接，即 rgb(255, 255, 255) => '#' + 'FF' + 'FF' + 'FF'。
2.  巧妙利用左移，我们把十六进制数值部分当成一个整数，即FFFFFF,我们可以理解为FF0000 + FF00 + FF, 如同我们上面解释，如果左移是基于十六进制计算的，则可以理解为FF << 4, FF << 2, FF, 而实际上我们转为二进制则变为 FF << 16，如下：

```
x * 16^4  = x * 2 ^ 16
```

了解了原理以后，代码如下：

```
function RGBToHex(rgb){
    
    let arr = rgb.match(/\d+/g);
    if (!arr || arr.length !== 3) {
        console.error('rgb数值不合法');
        return
    }
    let hex = (arr[0]<<16 | arr[1]<<8 | arr[2]).toString(16);
    
    if (hex.length < 6) {
        hex = '0' + hex;
    }
    return `#${hex}`;
}
```

-   #### 有符号右移 >>
    

> 该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以填充左侧。由于新的最左侧的位总是和以前相同，符号位没有被改变。所以被称作“符号传播”。

ps: 对任一数值 x 进行右移n, 相当于十进制里的除以10的倍数，在这里是指除以数之后取整

```
x / 2^n
```

应用场景：

###### 十六进制转RGB

原理见上方RGB转十六进制

```
function hexToRGB(hex){
    if (!/^#([0-9a-fA-F]{3}){1,2}$/.test(hex)) {
        console.error('颜色不合法'); 
        return
    };
    
    if (hex.length == 4) {
        hex = hex.replace(/([0-9a-fA-F])/g, '$1$1');
    };
    let num = hex.replace('#', '0x');
    let r = num >> 16;
    
    let g = num >> 8 & 0xff;
    let b = num  & 0xff;    
    return `rgb(${r},${g},${b})`;
}
```

-   #### 无符号右移 >>>
    

> 该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用0填充。因为符号位变成了 0，所以结果总是非负的。（译注：即便右移 0 个比特，结果也是非负的。）

#### 题外话

想起之前小组内的一道算法题，题目是这样的：  
1.一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法？  
解题思路是：

/\*因为n级台阶，第一步有n种跳法：跳1级、跳2级、到跳n级  
跳1级，剩下n-1级，则剩下跳法是f(n-1)  
跳2级，剩下n-2级，则剩下跳法是f(n-2)  
所以f(n)=f(n-1)+f(n-2)+...+f(1)  
那么f(n-1)=f(n-2)+f(n-3)+...+f(1)

所以算法为：

```
function jumpFloorII(number){
    return 1<<(number-1);
}
```

WTF? 什么意思？  
其实很简单，看下面过程

f(n)=f(n-1)+f(n-2)+...+f(1)

f(n-1)=f(n-2)+f(n-3)+...+f(1)

f(n) = 2\*f(n-1) = 4 \* f(n-2) = 8 \* f(n-3) ..... = 2的(n-1)次方乘f(1),转为位运算即为 1 << (n - 1)

#### 练习题：如何实现日历签到功能

1.  怎么设计能使数据最少
2.  每日签到应该怎么更新
3.  怎么判断某天是否签到

ps: 码字不易，如果觉得本文对你有帮助，给个赞吧，哈哈哈～～

文中如有错误及不当之处，欢迎及时指出；如果觉得文章对你有帮助，请点下面的推荐，谢谢~  
ps：自己新建一技术交流qq群，85530789，欢迎大家加入  
长期接开发私单，欢迎联系