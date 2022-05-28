CREATE PROCEDURE [dbo].[spTable_Edit]
	@Id UNIQUEIDENTIFIER,
	@Name NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE 
		[Table]
	SET 
		[Name] = @Name

	WHERE 
		[Table].[Id] = @Id
END
