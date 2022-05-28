CREATE PROCEDURE [dbo].[spGroup_Select]
	@GroupId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		[Group].[Id],
		[User].[UserName],
		[Group].[Name] as GroupName,
		[Group].[Color],
		[Group].[Name]
	FROM
		[dbo].[Group], [dbo].[User]
	WHERE
		[Group].[Id] = @GroupId and
		[User].[Id] = [Group].[UserId]

		
End
