﻿CREATE TABLE [dbo].[Card]
(
	[Id] UNIQUEIDENTIFIER DEFAULT NEWID(),
	[Info] nvarchar(max) NOT NULL,
	CONSTRAINT [PK_Card] PRIMARY KEY ([Id]),
)
