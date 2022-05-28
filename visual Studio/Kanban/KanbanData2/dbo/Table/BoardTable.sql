CREATE TABLE [dbo].[BoardTable]
(
	[BoardId] UNIQUEIDENTIFIER,
	[TableId] UNIQUEIDENTIFIER,
	[Position] INT
	CONSTRAINT [PK_BoardTable] PRIMARY KEY  ([BoardId], [TableId], [Position]), 
	CONSTRAINT [FK_BoardTable-BoardId_Board] FOREIGN KEY ([BoardId]) REFERENCES [Board]([Id]),
	CONSTRAINT [FK_BoardTable-TableId_Table] FOREIGN KEY ([TableId]) REFERENCES [Table]([Id]),



)
