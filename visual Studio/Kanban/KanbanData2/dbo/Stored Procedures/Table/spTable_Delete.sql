CREATE PROCEDURE [dbo].[spTable_Delete]
	@tableId UNIQUEIDENTIFIER
AS
BEGIN
	DELETE 
		[Table]
	WHERE 
		[Table].[Id] = @tableId
END