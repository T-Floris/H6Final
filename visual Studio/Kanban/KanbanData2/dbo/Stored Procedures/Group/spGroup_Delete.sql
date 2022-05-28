CREATE PROCEDURE [dbo].[spGroup_Delete]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE [GroupUser]
	WHERE [GroupUser].[GroupId] = @Id
	
	DELETE [Group]
	WHERE [Group].[Id] = @Id
END

