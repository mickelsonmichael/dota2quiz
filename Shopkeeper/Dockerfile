FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY . .
COPY ["Shopkeeper.Business/*.csproj", "./Shopkeeper.Business/"]
COPY Shopkeeper.Data/*.csproj ./Shopkeeper.Data/
COPY Shopkeeper.Services/*.csproj ./Shopkeeper.Services/
COPY Shopkeeper/*.csproj ./Shopkeeper/
RUN dotnet restore

# copy everything else and build app
COPY Shopkeeper/. ./Shopkeeper/
RUN dotnet build "Shopkeeper/Shopkeeper.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish Shopkeeper/Shopkeeper.csproj -c Release -o /app/publish

# final stage/image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Shopkeeper.dll"]