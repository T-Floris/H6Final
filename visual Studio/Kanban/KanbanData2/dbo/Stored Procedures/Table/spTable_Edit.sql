CREATE PROCEDURE [dbo].[spTable_Edit]
	@TableId UNIQUEIDENTIFIER,
	@Name NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE 
		[Table]
	SET 
		[Name] = @Name

	WHERE 
		[Table].[Id] = @TableId
END
