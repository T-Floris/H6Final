CREATE PROCEDURE [dbo].[spBoard_Update]
	@Id UNIQUEIDENTIFIER,
	@BoardName nvarchar(256)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [Board]
	SET [Name] = @BoardName
	WHERE [Board].[Id] = @Id
END
