CREATE PROCEDURE [dbo].[spGroup_Update]
	@Id UNIQUEIDENTIFIER,
	@GroupName nvarchar(256)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [dbo].[Group]
	SET [Name] = @GroupName
	WHERE [Group].[Id] = @Id
END

