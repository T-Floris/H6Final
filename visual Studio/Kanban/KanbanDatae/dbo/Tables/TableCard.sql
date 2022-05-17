CREATE TABLE [dbo].[TableCard]
(
	[TableId] nvarchar(50),
	[CardId] nvarchar(50),
	CONSTRAINT [PK_TableCard] PRIMARY KEY  ([TableId], [CardId]),
	CONSTRAINT [FK_TableCard-TableId_Table] FOREIGN KEY ([TableId]) REFERENCES [Table]([Id]),
	CONSTRAINT [FK_TableCard-CardId_Card] FOREIGN KEY ([CardId]) REFERENCES [Card]([Id]),

)
