## DDL 库操作

### 查询

- 所有数据库
  
  ```sql
  SHOW DATABASES;
  ```

- 当前数据库
  
  ```sql
  SELECT DATABASE();
  ```

### 创建

```sql
CREATE DATABASE [IF NOT EXISTS] XXX [DEFAULT CHARSET 字符集] [COLLATE 排序规则]
```

- 字符集一般使用 `utf8mb4` 占用 4 字节

### 删除

```sql
DROP DATABASE [IF NOT EXISTS] XXX
```

### 使用

```sql
USE XXX
```

## DDL 表操作

### 查询

- 查询当前数据库所有表
  
  ```sql
  SHOW TABLES;
  ```

- 查询表结构
  
  ```sql
  DESC 表名;
  ```

- 查询指定表的建表语句
  
  ```sql
  SHOW CREATE TABLE 表名;
  ```

### 创建

```sql
CREATE TABLE 表名(
    字段 类型 [COMMENT 字段注释]
)[COMMENT 表注释];
```

#### 数据类型

- 数值类型
  
  | 类型            | 大小  | 有符号 (SIGNED) 范围        | 无符号 (UNSIGNED) 范围 | 描述      |
  |:-------------:|:---:|:----------------------:|:-----------------:|:-------:|
  | TINYINT       | 1 b | -128 ，127              | 0 ， 255           | 小整数值    |
  | SMALLINT      | 2 b | -32768，32767           | 0，65535           | 大整数值    |
  | MEDIUMINT     | 3 b | -8388608，8388607       | 0，16777215        | 中等大小整数值 |
  | INT 或 INTEGER | 4 b | -2147483648，2147483647 | 0，4294967295      | 大整数值    |
  | BIGINT        | 8 b |                        |                   | 极大整数值   |
  | FLOAT         | 4 b |                        |                   | 单精度浮点数值 |
  | DOUBLE        | 8 b |                        |                   | 双精度浮点数值 |
  | DECIMAL       |     | 依赖于指定的精度和标度            |                   | 小数值     |
  
  ps：age TINYINT UNSIGNED ...

- 字符串类型
  
  | 类型         | 大小               | 描述                          |
  |:----------:|:----------------:|:---------------------------:|
  | CHAR       | 0 - 255 b        | 定长字符串 char(10) 不满 10 会用空格补位 |
  | VARCHAR    | 0 - 65535 b      | 变长字符串 varchar(10)           |
  | TINYBLOB   | 0 - 255 b        | 不超过 255 个字节的二进制数据           |
  | TINYTEXT   | 0 - 255 b        | 短文本字符串                      |
  | BLOB       | 0 - 65535 b      | 二进制形式的文本数据                  |
  | TEXT       | 0 - 65535 b      | 长文本数据                       |
  | MEDIUMBLOB | 0 - 16777215 b   | 二进制形式的中等长度文本数据              |
  | MEDIUMTEXT | 0 - 16777215 b   | 中等长度文本数据                    |
  | LONGBLOB   | 0 - 4294967295 b | 二进制形式的极大本文数据                |
  | LONGTEXT   | 0 - 4294967295 b | 极大的文本数据                     |

- 日期和时间
  
  | 类型        | 大小  | 范围                                        | 格式                       | 描述       |
  |:---------:|:---:|:-----------------------------------------:|:------------------------:|:--------:|
  | DATE      | 3   | 1000-01-01 至 9999-12-31                   | YYYY - MM - DD           | 日期值      |
  | TIME      | 3   | -838：59：59 至 838：59：59                    | HH : MM : SS             | 时间值或持续时间 |
  | YEAR      | 1   | 1901 - 2155                               | YYYY                     | 年份       |
  | DATETIME  | 8   | 1000-01-01 00：00：00 至 9999-12-31 23：59：59 | YYYY - MM - DD HH：MM ：SS | 混合日期时间   |
  | TIMESTAMP | 4   | 1970-01-01 00：00：01 至 2038-01-31 03：14：07 | YYYY - MM - DD HH：MM ：SS | 混合日期时间戳  |

### 修改

- 添加字段
  
  ```sql
  ALTER TABLE xxx ADD 字段名 类型(类型) [COMMENT 注释] [约束];
  ```

- 修改字段
  
  - 修改数据类型
    
    ```sql
    ALTER TABLE xxx MODIFT 字段名 新数据类型(长度);
    ```
  
  - 修改字段名和字段类型
    
    ```sql
    ALTER TABLE XXX CHANGE 旧字段 新字段 类型(长度) [COMMENT 注释] [约束];
    ```

- 修改表名
  
  ```sql
  ALTER TABLE 表名 RENAME TO 新表名;
  ```

### 删除

- 删除字段
  
  ```sql
  ALTER TABLE xxx DROP 字段名;
  ```

- 删除表
  
  ```sql
  DROP TABLE [IF EXISTS] 表名;
  ```

- 删除指定表 并重新创建
  
  ```sql
  TRUNCATE TABLE 表名;
  ```


