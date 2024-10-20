## Function

### 字符串函数

| 函数                       | 功能                            |
|:------------------------ |:----------------------------- |
| CONCAT(S1,S2,....Sn)     | 字符串拼接                         |
| LOWER(str)               | 将字符串全部转为小写                    |
| UPPER(str)               | 将字符串全部转为大写                    |
| LPAD(str,n,pad)          | 左填充，用字符串pad对str左边进行填充，到达n个字符  |
| RPAD(str,n,pad)          | 右填充，用字符串pad对str右边进行填充，到达n个字符  |
| TRIM(str)                | 去掉字符串头尾空格                     |
| SUBSTRING(str,start,len) | 返回从字符串str从start位置起的len个长度的字符串 |

### 数值函数

| 函数         | 功能                |
|:---------- |:----------------- |
| CEIL(x)    | 向上取整              |
| FLOOR(x)   | 向下取整              |
| MOD(x,y)   | 返回x/y的模           |
| RAND()     | 返回0~1内的随机数        |
| ROUND(x,y) | 求参数x四舍五入的值，保留y位小数 |

### 日期函数

| 函数                                | 功能                          |
|:--------------------------------- |:--------------------------- |
| CURDATE()                         | 返回当前日期                      |
| CURTIME()                         | 返回当前时间                      |
| NOW()                             | 返回当前日期和时间                   |
| YEAR(data)                        | 获取指定data的年份                 |
| MONTH(data)                       | 获取指定data的月份                 |
| DAY(data)                         | 获取指定data的日期                 |
| DATA_ADD(data,INTERVAL expr type) | 返回一个日期/时间值加上一个时间间隔expr后的时间值 |
| DATEDIFF(data1,data2)             | 返回起始时间data1和结束时间data2之间的天数  |

### 流程函数

| 函数                                                         | 功能                                                                   |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| IF(value，t，f)                                              | 如果value为true 返回t，否则返回f                                               |
| IFNULL(value1，value2)                                      | 如果value1不为空，返回value1，否则返回value2                                      |
| CASE WHEN [val1] THEN [res1] ... ELSE [default] END        | 如果val1为true，返回res1，... 否则返回 default 默认值                              |
| CASE [expr] WHEN [val1] THEN [res1] ... ELSE [default] END | 如果expr值等于val1，返回res1，... 否则返回default 默认值 |
