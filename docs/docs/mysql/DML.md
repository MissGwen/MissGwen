## 添加数据

- 给指定字段添加数据
  
  ```sql
  INSERT INTO 表名 (字段名1,字段名2,...) VALUES (值1,值2,...);
  ```

- 给所有的字段添加数据
  
  ```sql
  INSERT INTO 表名 VALUES (值1,值2,...);
  ```

- 批量添加数据
  
  ```sql
  INSERT INTO 表名 (字段名1,字段名2,...) VALUES (值1,值2,...),(值1,值2,...),(值1,值2,...);
  INSERT INTO 表名 VALUES (值1,值2,...),(值1,值2,...),(值1,值2,...);
  ```

## 修改数据

```sql
UPDATE 表名 SET 字段1 = 值1 , 字段2 = 值2, .... [WHERE 条件];
```

## 删除数据

```sql
DELETE FROM 表名 [WHERE 条件];
```
