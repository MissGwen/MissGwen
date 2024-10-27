## 概述

- 分类
  
  | 约束   | 描述                           | 关键字         |
  | ---- | ---------------------------- | ----------- |
  | 非空约束 | 限制该字段数据不能为NULL               | NOT NULL    |
  | 唯一约束 | 保证该字段的所有数据都是唯一的，不重复的         | UNIQUE      |
  | 主键约束 | 主键是一行数据的唯一标识                 | PRIMARY KEY |
  | 默认约束 | 保存数据时，如果未指定该字段的值，则采用默认值      | DEFAULT     |
  | 检查约束 | 保证字段值满足某一个条件                 | CHECK       |
  | 外键约束 | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 | FOREIGN KEY |

## 外键约束

- 添加外键
  
  ```sql
  CREATE TABLE 表名(
      字段名 数据类型
      ...
      [CONSTRAINT] [外键名称] FOREIGN KEY (外键字段名) REFERENCES 主表(主表列名)
  );
  
  ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名) REFERENCES 主表(主表列名);
  ```


