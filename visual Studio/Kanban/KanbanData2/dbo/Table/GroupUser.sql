CREATE TABLE [dbo].[GroupUser]
(
	[GroupId] nvarchar(50),
	[UserId] nvarchar(450),
	[GroupAccessId] nvarchar(50)
	CONSTRAINT [PK_GroupUser] PRIMARY KEY ([GroupId], [UserId], [GroupAccessId]), 
	CONSTRAINT [FK_GroupUser-UserId_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]),
	CONSTRAINT [FK_GroupUser-GroupId_Group] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id]),
	CONSTRAINT [FK_GroupUser-GroupAccessId_GroupAccess] FOREIGN KEY ([GroupAccessId]) REFERENCES [GroupAccess]([Id])

)
