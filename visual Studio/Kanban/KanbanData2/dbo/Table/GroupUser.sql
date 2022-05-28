CREATE TABLE [dbo].[GroupUser]
(
	[GroupId] UNIQUEIDENTIFIER,
	[UserId] UNIQUEIDENTIFIER ,
	[GroupAccessId] UNIQUEIDENTIFIER NOT NULL,
	CONSTRAINT [PK_GroupUser] PRIMARY KEY ([GroupId], [UserId], [GroupAccessId]), 
	CONSTRAINT [FK_GroupUser-UserId_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]),
	CONSTRAINT [FK_GroupUser-GroupId_Group] FOREIGN KEY ([GroupId]) REFERENCES [Group]([Id]),
	CONSTRAINT [FK_GroupUser-GroupAccessId_GroupAccess] FOREIGN KEY ([GroupAccessId]) REFERENCES [GroupAccess]([Id])

)
