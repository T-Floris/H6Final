CREATE PROCEDURE [dbo].[spGroup_Create]
	@UserId UNIQUEIDENTIFIER,
	@Name nvarchar(50),
	@Color nvarchar(7)
AS
BEGIN
	DECLARE @GroupId UNIQUEIDENTIFIER;

	DECLARE @GroupAccessId UNIQUEIDENTIFIER;

	DECLARE @GroupTable TABLE (
			GroupId uniqueidentifier
		)
	--Create group
	INSERT INTO [dbo].[Group]
	(
		[Id],
		[UserId],
		[Name],
		[Color]
	)
	OUTPUT inserted.Id INTO @GroupTable
	VALUES
	(
		DEFAULT,
		@UserId,
		@Name,
		@Color
	)

	--Get the group
	SELECT 
		@GroupId = GroupId
	FROM 
		@GroupTable

	--Get GroupAccess Id for owner
	SELECT 
		@GroupAccessId = [dbo].[GroupAccess].[Id] 
	FROM 
		[dbo].[GroupAccess]
	WHERE
		[GroupAccess].[Name] = 'Owner'

	--users access on group
	INSERT INTO [dbo].[GroupUser]
	(
		UserId,
		GroupId,
		GroupAccessId
	)
	VALUES
	(
		@UserId,
		@GroupId,
		@GroupAccessId
	)
END
