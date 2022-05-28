CREATE PROCEDURE [dbo].[spGroupAccess_Delete]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	DELETE 
		[GroupAccess]
	WHERE 
		[GroupAccess].[Id] = @Id
END
