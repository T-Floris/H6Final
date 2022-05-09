CREATE TABLE [dbo].[BoardTable]
(
	[BoardId] nvarchar(50),
	[TableId] nvarchar(50),
	CONSTRAINT [PK_BoardTable] PRIMARY KEY  ([BoardId], [TableId]), 
	CONSTRAINT [FK_BoardTable-BoardId_Board] FOREIGN KEY ([BoardId]) REFERENCES [Board]([Id]),
	CONSTRAINT [FK_BoardTable-TableId_Table] FOREIGN KEY ([TableId]) REFERENCES [Table]([Id]),



)
