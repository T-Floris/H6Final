CREATE TABLE [dbo].[TableCard]
(
	[TableId] UNIQUEIDENTIFIER,
	[CardId] UNIQUEIDENTIFIER,
	[Position] INT, 
    CONSTRAINT [PK_TableCard] PRIMARY KEY  ([TableId], [CardId], [Position]),
	CONSTRAINT [FK_TableCard-TableId_Table] FOREIGN KEY ([TableId]) REFERENCES [Table]([Id]),
	CONSTRAINT [FK_TableCard-CardId_Card] FOREIGN KEY ([CardId]) REFERENCES [Card]([Id]),

)
