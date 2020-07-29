FROM mcr.microsoft.com/dotnet/core/sdk:3.1
COPY * /App/
RUN cd /App && dotnet publish -c Release
WORKDIR /App
ENTRYPOINT ["dotnet", "bin/Release/netcoreapp3.1/UimCsharpExamples.dll"]
