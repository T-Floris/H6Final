CREATE PROCEDURE [dbo].[spBoardAccess_Delete]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	DELETE 
		[BoardAccess]
	WHERE 
		[BoardAccess].[Id] = @Id
END