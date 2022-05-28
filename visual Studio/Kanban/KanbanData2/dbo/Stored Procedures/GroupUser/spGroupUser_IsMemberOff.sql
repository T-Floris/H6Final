CREATE PROCEDURE [dbo].[spGroupUser_IsMemberOff]
	@groupId UNIQUEIDENTIFIER,
	@userId UNIQUEIDENTIFIER
AS
BEGIN
SELECT CASE WHEN EXISTS (
		SELECT
			[GroupUser].GroupAccessId as AccessName
		FROM
			[dbo].[GroupUser]
		WHERE
			[GroupUser].[GroupId] = @groupId and
			[GroupUser].[UserId] = @userId
		)
	THEN CAST(1 AS BIT)
	ELSE CAST(0 AS BIT) 
	END
End
