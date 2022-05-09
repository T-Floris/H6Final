CREATE TABLE [dbo].[BoardGroup]
(
	[BoardId] nvarchar(50),
	[GroupId] nvarchar(50),
	[BoardAccessId] nvarchar(50),
	CONSTRAINT [PK_BoardGroup] PRIMARY KEY  ([BoardId], [GroupId], [BoardAccessId]), 
	CONSTRAINT [FK_BoardGroup-BoardId_Board] FOREIGN KEY ([BoardId]) REFERENCES [Board]([Id]),
	CONSTRAINT [FK_BoardGroup-GroupId_Group] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id]),
	CONSTRAINT [FK_BoardGroup-BoardAccessId_GroupAccess] FOREIGN KEY ([BoardAccessId]) REFERENCES [GroupAccess]([Id])

)
