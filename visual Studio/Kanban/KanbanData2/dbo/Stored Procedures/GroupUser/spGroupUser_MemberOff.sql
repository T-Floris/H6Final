CREATE PROCEDURE [dbo].[spGroupUser_MemberOff]
	@userId UNIQUEIDENTIFIER
AS
BEGIN
	Select
		[GroupUser].[GroupId]
	From
		[dbo].[GroupUser]
	Where
		[GroupUser].[UserId] = @userId
END
