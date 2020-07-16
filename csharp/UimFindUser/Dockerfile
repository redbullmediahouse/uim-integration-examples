FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
COPY bin/Release/uimfinduser/publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "UimFindUser.dll"]