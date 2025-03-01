# Embedded Analytics POC

## Table of Contents
1. [Poc Details](#POC-Details)
	1. [Source Code](#Source-Code)
	2. [POC application](#POC-application)
		1. [Modules](#Modules)
		2. [Configuration Points](#Configuration-Points)
		3. [Code Organization](#Code-Organization)
		4. [Steps to execute](#Steps-to-execute)
	3.  [PowerBI Setup (trial for POC)](#PowerBI-Setup-(trial-for-POC))
		1. [Authoring](#Authoring)
		2. [Embedding](#Embedding)
	4. [Embedding Examples](#Embedding-Examples)
2. [PowerBI Authoring Overview](#PowerBI-Authoring-Overview)
	1. [Licensing](#Licensing)
		1. [Feature comparison](#Feature-comparison)
		2. [Relative pricing comparison](#Relative-pricing-comparison)
	2. [Tools](#Tools)
	3. [High-level architecture](#High-level-architecture)
	4. [Core Concepts](#Core-Concepts)
		1. [Containers](#Containers)
		2. [Data Federation](#data-federation)
		3. [Visualization](#Visualization)
		4. [Interaction](#Interaction)
		5. [Security](#Security)
		6. [Management](#Management)
3. [PowerBI Embedded Overview](#PowerBI-Embedded-Overview)
	1. [Licensing](#Licensing)
	2. [Authentication](#Authentication)
		1. [Authentication Flow](#Authentication-Flow)
	3. [APIs](#APIs)

## POC Details
### Source Code
Github: https://github.com/robinrizvi/bi-poc

This repository contains the proof of concept for demonstrating embedded analytics use cases through PowerBI. This repository contains:

 - PowerBI artefacts (source files): PBIX files (files that contain report and dataset information), data source excel files etc.
 - POC Documentation: Documentation that details out the findings for this POC
 - POC application modules: Application modules mirroring technology stack that contain code to demonstrate aspects of this POC

### POC application
The sample application is included in the repository mentioned above. It demonstrates embedded analytics usage in an application which can be used as a reference when integrating with the application.

#### Modules
 - poc-web: This is the frontend of the application developed with Angular using powerbi client APIs
 - poc: This is the backend of the application developed primarily with Java, Spring Framework, MSAL and powerbi admin REST APIs

#### Configuration points
 - poc-web: src/app/common/service/powerbi/powerbi.service.ts
 - poc: com/powerbi/poc/config/Config.java

#### Code Organization
 - poc-web
![poc-web code org](https://drive.google.com/uc?export=view&id=1WNuDPVM1fVhJ3DMtcMaAyx42ekm_WLBU)
 - poc
![poc code org](https://drive.google.com/uc?export=view&id=1RkfRjs0ZqoN2dq7qojlgMTZSgkqLBNQi)

#### Steps to execute
 - poc-web	
	 Install Node and NPM
	 `npm install -g @angular/cli`
	 `ng serve`
 - poc
	 `mvn clean install -DskipTests`
	 Run main class: `PocApplication`
### PowerBI Setup (trial for POC)
The following setup uses personal email like gmail, hotmail etc. Work/organization accounts need to be managed on an  organization level from the Microsoft 365 admin portal.
#### Authoring
 - Microsoft Account Setup
	- Navigate to https://www.microsoft.com/en-in/microsoft-365/enterprise/office365-plans-and-pricing
	- Choose any subscription that allows trial (try for free) option
	- Follow the wizard and press Setup Account
	- Once you reach the payment payment, you can skip it and close the window - no need to complete the process, we just need the account setup to be done
 - Activate PowerBI Service (Web)
	- Navigate to https://powerbi.microsoft.com/en-in/getting-started-with-power-bi/
	- Click on Try free
	- Login in using the created **onmicrosoft** email id
	- Once the powerbi portal is ready (it will be activated with powerbi free license)
	- Click on user icon and select "Start Trial" to activate trial of PowerBI Pro license
 - PowerBI Desktop
	- Download PowerBI Desktop from https://www.microsoft.com/en-us/download/details.aspx?id=58494
	- Login into PowerBI Desktop using the **onmicrosoft** email id created above
	- Connect to datasource(s) and create a dataset
	- Save as pbix file
	- Click Publish to publish to PowerBI Service
	- Resume authoring reports/dashboards against the created dataset in the PowerBI Service (Web)
#### Embedding
 - Embed setup tool
	- Navigate to https://app.powerbi.com/embedsetup/AppOwnsData
	- Follow the wizard and grant all powerbi privileges and suggested azure permissions:
		- Login with the created onmicrosoft email ID
		- Register the app in Azure AD and grant all privileges for powerbi admin REST APIs and Azure permissions
 - Add a client secret (required for authentication) for the created Azure AD app through the above wizard
	- Goto Azure portal https://portal.azure.com/#home with the newly created omnmicrosoft email
	- Search for and select Azure Active Directory
	- Select App registrations and select your application from the list
	- Select Certificates & secrets
	- Select Client secrets, and then Select New Client secret
	- Provide a description of the secret and a duration
	- Select Add
 - Create an Azure AD security group
Your service principal doesn't have access to any of your Power BI content and APIs. To give the service principal access, create a security group in Azure AD. Then add the service principal you created to that security group
	- Assign security principal/app to the security group
 - Enable the Power BI service admin settings (PowerBI->Admin Portal)
	- Enable Embed content in apps either for the entire organization or for the specific security group that was created in Azure AD
	- Enable Allow service principals to use Power BI APIs either for the entire organization or for the specific security group that was created in Azure AD
 - Add the service principal to your workspace (PowerBI Service->Workspace settings)
	- Under access add the service principal or the security group that was created
 - Get the required properties to construct an embed configuration that can be used by client APIs to embed the PowerBI artifact in the application
	- Once a report has been created, open the report in PowerBI Service
	- Get the workspace ID from the URL. An example URL is https://app.powerbi.com/groups/eed5dcae-8289-4804-9b36-71e172508f1c/reports/1526aed8-b15f-405c-a42a-c2fcc21c3581/ReportSection . The url part parameter after groups is the workspace id i.e. eed5dcae-8289-4804-9b36-71e172508f1c and URL part parameter after the reports is the report id i.e. 1526aed8-b15f-405c-a42a-c2fcc21c3581
	- User PowerBI Admin rest API through the application or from the PowerBI URL: https://learn.microsoft.com/en-us/rest/api/power-bi/reports where APIs can be tried out directly from this page by passing the correct parameters
	- Use client APIs through the application or PowerBI playground (developer sandbox, embed your report) and test APIs to get IDs and names of artefacts in a report https://playground.powerbi.com/en-us/dev-sandbox
### Embedding examples
 - Embedding Report
 - Embedding Visual
 - Embedding Dashboard
 - Embedding Dashboard Tile
 - Embedding ad-hoc report (with runtime application data) with programmatic visual and data configuration
 - Embedding ad-hoc report designer
 - Embedding Q&A visual
 - Inbound context passing (passing context/data from application to PowerBI)
 - Outbound context passing (passing context/data from PowerBI to application)
 - Drill up and down
 - Drill through (PowerBI to PowerBI)
 - Drill through (PowerBI to application)
 - Report Authoring through Report Designer
 - Report Authoring programatically
 - Applicaiton session validation (interactivity within application and PowerBI artifacts after application session invalidation)
 - PowerBI Session validation (interactivity within PowerBI artifacts after PowerBI session invalidation)
 - Multi-tenancy (through RLS - Row Level Security)
 - Embedding MongoDB backed report (using Atlas SQL interface and connector)
 - Embedding REST API backed report (using Web connector)

## PowerBI Authoring Overview
The following section provides an overview of the PowerBI basics and an overview of authoring analytics reports in PowerBI
### Licensing
To author reports in PowerBI, three types of licenses are available to choose from:
 - **PowerBI Free**: This version is free of charge. PowerBI Free allows to get started with creating reports, dashboards etc. in PowerBI but is limited in terms of features required for complete authoring. A summary of key features and their availability across licenses is mentioned in the table below.
 - **PowerBI Pro**: Power BI Pro is available on a subscription basis and typically costs a monthly fee per user. Power BI Pro is the full version of Power BI. It comes complete with the ability to develop reports and dashboards with all the features. In terms of capabilities or quota of resources available across features (like data capacity, refresh frequency etc.), it is on the lower side compared to the premium per user (PPU) license (discussed below). But since specifically we would be using PowerBI for embedding requirements we already would be acquiring a capacity-based license (which will be discussed in the embedding section below) which will have the required quota of resources to serve our embedded needs hence having just the PowerBI Pro license for authoring would serve our requirements. In the case where PowerBI analytics and reporting are to be directly used (without embedding) across internal or external users through PowerBI Service (web/saas) then based on sharing and usage requirements, the choice has to be made between going to pro or premium. *PowerBI Pro is included with Microsoft 365 E5 subscription. Power BI Pro per-user subscriptions are available for self-service purchase, as well as through the Microsoft 365 admin center.*
 - **PowerBI Permium Per User**: Power BI Premium Per User is also available on a subscription basis, but it is more expensive per user than Power BI Pro. It includes all the features of Power BI Pro but is a premium version of Pro. In terms of capabilities or quota of resources available across features (like data capacity, refresh frequency etc.), it is more premium than the pro version. It allows organizations to take advantage of Premium capacity features (akin to capacity-based licenses) on a per-user basis. *Power BI Premium per-user subscriptions are available for self-service purchase, as well as through the Microsoft 365 admin center.*
#### Feature comparison
![A graphic that gives a visual overview of the Power BI platform features and licenses](https://i0.wp.com/www.phdata.io/wp-content/uploads/2022/06/What-are-the-Different-Licenses-in-Power-BI-1.jpg)
#### Relative pricing comparison
![PowerBI-Licenses-USD-Pricing](https://drive.google.com/uc?export=view&id=1VtZe_wi9PAL3ggiIcWACEEbm8WNTeIM1)
### Tools
 - **PowerBI Desktop**: Power BI Desktop is a Windows application that can be downloaded and installed for free on your local computer. Desktop is a complete data analysis and report creation tool that is used to connect to, transform, visualize, and analyze your data. It includes the Query Editor, in which you can connect to many different sources of data, and combine them (often called modeling) into a data model. Then you design a report based on that data model. Reports can be shared with others directly or by publishing to the Power BI service. *So primarily for data federation and modeling, we need to rely on PowerBI Desktop*, and once the dataset is ready it can be published to PowerBI Service where the creation of visualizations like reports, dashboards, etc. and other operations can be carried out.
 - **PowerBI Service (web/saas)**: The Power BI service is a cloud-based service or software as a service (SaaS). It supports report editing and collaboration for teams and organizations. You can connect to data sources in the Power BI service, too, *but modeling is limited as compared to PowerBI Desktop*. The report editors in Power BI Desktop and in the PowerBI service are similar.

**Note**: Since data modeling and federation capabilities of PowerBI Service are limited at the moment it makes the usage of PowerBI Desktop mandatory at the moment. Microsoft Fabric (it is a unified platform to cover all the data and analytics needs of an organization) offers DataFlow Gen2 as part of their Data Factory module that allows performing data modeling and federation in a SAAS environment with Microsoft Fabric which could eliminate the need of a local desktop application. Microsoft Fabric is currently in PREVIEW hence details of it have not been analysed in detail and tried as part of this POC.

Since both the tools (PowerBI Desktop and PowerBI Service) overlap in terms of the features, here is a Venn diagram that showcases major features and their availability and overlaps across these tools:
![Venn diagram showing the relationship between Power BI Desktop and the Power BI service.](https://learn.microsoft.com/en-us/power-bi/fundamentals/media/service-service-vs-desktop/power-bi-venn-diagram.png)
The workflow often involves creating and designing reports in Power BI Desktop and then publishing them to the Power BI Service:
![Screenshot of Diagram of Power BI Desktop, Service, and Mobile showing their integration.](https://learn.microsoft.com/en-us/power-bi/fundamentals/media/power-bi-overview/power-bi-overview-blocks.png)
### High-level architecture
![What is Power BI Architecture and How to Work on Data Security](https://www.edureka.co/blog/wp-content/uploads/2019/09/pp3-min.png)
### Core Concepts
Following are the core concepts or building blocks required to build an analytics solution for an organization:
 #### **Containers**
- **Capacity**: Capacities are a core Power BI concept representing a set of resources (storage, processor, and memory) used to host and deliver your Power BI content. Capacities are either  _shared_  or  _reserved_. A shared capacity is shared with other Microsoft customers, while a reserved capacity is reserved for a single customer. Reserved capacities require a  subscription
 - **Workspace**: Workspaces are created on capacities. Essentially, they're containers for dashboards, reports, apps, workbooks, datasets, and dataflows in Power BI
  - **App**: An app is a collection of dashboards and reports packaged/organized togehter as an application to deliver key metrics. Apps are interactive but consumers can't edit them
 #### **Data Federation**
 - **Data Source**: Data Sources that can be used with PowerBI are categorized as below:
    - File
    - Database
    - Microsoft Fabric (Preview)
    - Power Platform
    - Azure
    - Online Services
    - Other

    **Types and list**: List of data sources is available here: https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-data-sources
     List of all the PowerBI connectors that can be used to connect to the datasources is listed here: https://learn.microsoft.com/en-us/power-query/connectors/

    **Custom Connectors**: The Power Query SDK is a set of tools designed to help you create Power Query connectors. These connectors are often referred to as custom connectors or Power Query extensions. Custom connectors let you create new data sources or customize and extend an existing source. Common use cases include:
- Creating a business analyst-friendly view for a REST API
- Providing branding for a source that Power Query supports with an existing connector (such as an OData service or ODBC driver)
- Implementing OAuth v2 authentication flow for a SaaS offering
- Exposing a limited or filtered view over your data source to improve usability
- Enabling DirectQuery for a data source using an ODBC driver
    For further references, check out these links:
    https://learn.microsoft.com/en-us/power-query/install-sdk
    https://learn.microsoft.com/en-us/power-query/creating-first-connector
  
    **Connectivity modes**: Data source connection types primarily are:
    - **Import (the default mode)**: All data is imported/copied into PowerBI. This is fastest in terms of performance since all data resides with PowerBI. This also requires polishing and cleansing the data preferably following star schema since there are limitations on the dataset size based on the subscription/license
![Import Mode](https://learn.microsoft.com/en-us/power-bi/connect-data/media/service-dataset-modes-understand/import-model.png)
        Key Points:
		 - There's no concept of an Import model being partially loaded into memory. The entire model must be loaded to memory before Power BI can query the model, which can place pressure on available capacity resources, especially as the number and size of Import models grow.
		 - Model data is only as current as the latest refresh, and so Import models need to be refreshed, usually on a scheduled basis
    - **Direct Query**: This mode is an alternative to Import mode. Models developed in DirectQuery mode don't import data. Only schema is copied over, the data stays with the data source. Not all data sources support this.
![Direct Query](https://learn.microsoft.com/en-us/power-bi/connect-data/media/service-dataset-modes-understand/direct-query-model.png)
        Key Points:
		 - When data volumes are too large, even when  data reduction methods are applied, to load into a model, or practically refresh
		 - When reports and dashboards need to deliver  near real-time data, beyond what can be achieved within scheduled refresh limits. Scheduled refresh limits are eight times a day for shared capacity, and 48 times a day for a Premium capacity
		 - Import model size limits don't apply
		 - Models don't require scheduled data refresh
		 - Power Query/Mashup expressions and DAX formulas are limited to use only functions that can be transposed to native queries understood by the data source
    - **Composite**: Composite mode can mix Import and DirectQuery modes, or integrate multiple DirectQuery data sources. Models developed in Composite mode support configuring the storage mode for each model table. The table storage mode can be configured as Import, DirectQuery, or Dual.
![Composite Mode](https://learn.microsoft.com/en-us/power-bi/connect-data/media/service-dataset-modes-understand/composite-model.png)
    - **Live Connection**: Live connection is a method that lets you build a report in Power BI Desktop without having to build a dataset for it. When you create your report in Power BI Desktop, it can be connected to an already published Power BI dataset. A live connection allows you to rely on existing data, which can be updated without accessing the report. With live connection we can connect to one of the following data sources:
	   - A dataset that already exists in Power BI service  
	   - An Azure Analysis Services (AAS) database
	   - An on-premises instance of SQL Server Analysis Services (SSAS)
![connection types](https://i0.wp.com/urbizedge.com/wp-content/uploads/2023/03/Connection-types-.png?fit=1280,720&ssl=1)

	  **Capability of a connector and connection mode supported** can be checked in the respective connector documentation page, as an example for MongoDB Atlas: https://learn.microsoft.com/en-us/power-query/connectors/mongodb-atlas-sql-interface

    ##### **MongoDB Datasource Connectivity Walkthrough**: The following steps demonstrate the process of connecting to a MongoDB DataSource:
  For the purpose of this demonstration, we will be using MongoDB Atlas SQL connector against an Atlas federated database which includes our data from a MongoDB Atlas cluster. We will be using MongoDB cloud with a free shared tier cluster for configuring and setting up the MongoDB database and the Atlas federated database.
  - Signup and login into MongoDB cloud (https://cloud.mongodb.com/)
  - Under Deployment->Database, create a new cluster like the below:
 ![mongo test cluster](https://drive.google.com/uc?export=view&id=1Pzf7W3JyKvqOfmWbqsN9f1xBw5K3Qa6E)
  - Move to the **Collections** tab and create a new database
 ![mongo database](https://drive.google.com/uc?export=view&id=1XtZBcZi8g_R0hbnbqrgYXcrjKTG6Y6wJ)
  - Import the data (from csv or other sources)
  - Once the cluster is ready, click on **Connect** and choose **Atlas SQL**
 ![mongo connect](https://drive.google.com/uc?export=view&id=16dlplNJUZWBlaJHHwRDFO2vqT6DHi6wD)
  - Use the **PowerBI Connector** and copy the connection string that will be used in PowerBI to connect to this instance
  - Next, open **PowerBI Desktop** and follow the **Get Data** wizard. Select Database from the categories on the left, select **MongoDB Atlas SQL**, and then select Connect
 ![powerbi atlas connect](https://learn.microsoft.com/en-us/power-query/connectors/media/mongodb/mongodb_get_data.png)
  - In the MongoDB Atlas SQL window that appears, fill in the MongoDB URI and the federated Database name
 ![powerbi atlas connect](https://learn.microsoft.com/en-us/power-query/connectors/media/mongodb/mongodb_connection_dialogue.png)
  - Next, enter your Atlas MongoDB Database access username and password and select Connect
 ![powerbi atlas connect](https://learn.microsoft.com/en-us/power-query/connectors/media/mongodb/mongodb_authentication.png)
  - Next, in the Navigator, select one or multiple elements to import and use in Power BI Desktop. Then select either Load to load the table in Power BI Desktop, or Transform Data to open the Power Query editor where you can filter and refine the set of data you want to use, and then load that refined set of data into Power BI Desktop
  - Once the data is imported into the dataset, save the file as a pbix file. Click Publish to publish to PowerBI Service and resume authoring reports/dashboards against the created dataset in the PowerBI Service (Web).
			 
 - **Dataset**: A dataset is a collection of data that you import or connect to. Power BI lets you connect to and import all sorts of data sources and bring all of it together in one place. Dataset and data source as terms are used synonymously but they are two different things. A dataset contains information about the data source and data source credentials. The dataset also often includes a subset of data copied from the data source. Within a dataset, we can mix-match different connection types against data sources resulting in a composite model. Datasets are associated with workspaces, and a single dataset can be part of many workspaces. For each workspace, the listed dataset is a source of data available for one or more reports, and the dataset can contain data that comes from one or more sources
		**Modeling**: Data modeling in Power BI is a critical process that involves shaping and organizing your data to create a logical structure that can be used for analysis and reporting. It is a fundamental step in building effective and insightful reports and dashboards. Power BI has a dedicated Data Modeling view which allows to perform data modeling operations. Key concepts and steps in modeling:
	 - **Data Source Connection**: Connect Power BI to data source(s) and import data
	 - **Data Transformation**: After importing data, Power Query (which is integrated into Power BI) can be used to perform data transformation tasks. Power Query Editor provides a user-friendly interface for cleaning, shaping, and preparing your data. You can filter rows, remove duplicates, pivot and unpivot data, merge tables, and apply various data transformations to make the data more usable.
**Power Query** is a tool for extract-transform-load (ETL). That is, it lets you import and prepare your data for use. Contrasting with DAX, **DAX** is the other programming language available for Power BI. DAX is used for data analysis rather than ETL.
**Power Query Editor** is the graphical user interface to Power Query.
**Power Query M** ("M" for short) is the functional programming language used in Power Query.
![Data Transformation Power Query Editor](https://learn.microsoft.com/en-us/power-bi/transform-model/media/desktop-query-overview/query-overview-with-data-connection.png)
	 - **Custom/calculated data entities**
		 - **Custom/calculated Tables**: Tables are created in the dataset after importing data into the model from an external data source(s). But calculated tables lets you add new tables based on data you've already loaded into the model. Instead of querying and loading values into your new table's columns from a data source, you create a  Data Analysis Expressions (DAX)  formula to define the table's values. Calculated tables are best for intermediate calculations and data you want to store as part of the model, rather than calculating on the fly or as query results. Calculated tables behave the same way as regular tables in terms of applicability of operations on tables. For example, we can do a union or  cross join  two existing tables and have a cacluclated table represents those results
		 - **Custom/calculated Columns**: These are columns you create in a table based on calculations or expressions. Calculated columns are computed during data import and are useful for adding additional data to your model. Calculated columns are created during the data import process. They are calculated and stored in the model, which can increase the memory footprint. Calculated columns can be thought of as static values associated with rows in a table
		 - **Custom/calculated Measures**: Measures are calculations that are computed on the fly when used in reports and visuals. Measures are defined using the DAX (Data Analysis Expressions) language, and they enable you to perform aggregations, calculations, and KPIs. Measures are computed on the fly when you use them in visualizations, such as charts and tables. This means that they are not precomputed during data import and consume less memory. There are basically two types of measures:
			 - **Implicit Measures**: Implicit measures use a column from a data table by dragging the field into a visual in Power BI. They allow you to calculate Sum, Count, Average, Min, Max, and DistinctCount. When a field is in the values section, select the dropdown list to determine which summarization calculation that you want to perform on the field. These types of measures work for basic tables and summaries but are limited compared to explicit measures
![enter image description here](https://learn.microsoft.com/en-us/training/modules/modern-analytics-data-modeling/media/12-visualizations.png)
			 - **Explicit Measures**: Explicit measures require you to use the DAX formula language to explicitly write out the expression. These measures are better over an extended time and will allow you to create custom analytical metrics like Profit Margin YTD. You can create explicit measures by writing a formula in the editor. These measures offer the most flexibility and give you the power to use all capabilities of DAX
	 - **Relationships and Hierarchy**
		 - **Relationships**: 
			 - **Auto-Detect**: Power BI Desktop attempts to find and create relationships for you. The relationship options Cardinality, Cross filter direction, and Make this relationship active are automatically set. Power BI Desktop looks at column names in the tables you're querying to determine if there are any potential relationships. If there are, those relationships are created automatically. If Power BI Desktop can't determine with a high level of confidence there's a match, it doesn't create the relationship
			 - **Manual**:
				 1. On the Modeling  tab, select Manage relationships > New
				 2. In the Create relationship dialog box, in the first table drop-down list, select a table. Select the column you want to use in the relationship
				 3. In the second table drop-down list, select the other table you want in the relationship. Select the other column you want to use, and then select OK
By default, Power BI Desktop automatically configures the options Cardinality (direction), Cross filter direction, and Make this relationship active for the new relationship. However, these settings can be changed if necessary.
![enter image description here](https://learn.microsoft.com/en-us/power-bi/transform-model/media/desktop-create-and-manage-relationships/manualrelationship2.gif)
			 - **Relationship options**:
				 - **Cardinality**: The Cardinality option can have one of the following settings:
					 - **Many to one (*:1)**: A many-to-one relationship is the most common, default type of relationship. It means the column in a given table can have more than one instance of a value, and the other related table, often know as the lookup table, has only one instance of a value
					 - **One to one (1:1)**: In a one-to-one relationship, the column in one table has only one instance of a particular value, and the other related table has only one instance of a particular value
					 - **One to many (1:*)**: In a one-to-many relationship, the column in one table has only one instance of a particular value, and the other related table can have more than one instance of a value
					 - **Many to many (*:*)**: With composite models, you can establish a many-to-many relationship between tables, which removes requirements for unique values in tables. It also removes previous workarounds, such as introducing new tables only to establish relationships. 
				 - **Cross filter direction**: The Cross filter direction option can have one the following settings:
					 - **Both**: For filtering purposes, both tables are treated as if they're a single table. The Both setting works well with a single table that has many lookup tables that surround it. An example is a sales actuals table with a lookup table for its department. This configuration is often called a star schema configuration (a central table with several lookup tables). However, if you have two or more tables that also have lookup tables (with some in common) then you wouldn't want to use the Both setting. To continue the previous example, in this case, you also have a budget sales table that records target budget for each department. And, the department table is connected to both the sales and the budget table. Avoid the Both setting for this kind of configuration
					 - **Single**: The most common, default direction, which means filtering choices in connected tables work on the table where values are being aggregated
				 - **Make this relationship active**: When checked, the relationship serves as the active, default relationship. In cases where there's more than one relationship between two tables, the active relationship provides a way for Power BI Desktop to automatically create visualizations that include both tables
		 - **Hierarchy**: Hierarchies in Power BI are a way to organize data (related fields within a dataset) in a hierarchical structure, where one parent or first level is ranked over the other. This allows users to drill down from parent levels to lower levels in a specific order. Power BI Desktop can automatically detect some of these hierarchical relationships, especially in the case of date-related data. Another common example of a hierarchy is a structure with a category, subcategory, and product. Following example showcases a BusinessUnits table where we can define hierarchy between the fields of this table:
![enter image description here](https://help.zebrabi.com/wp-content/uploads/file-UuzU44Aotc.png)
This table has a hierarchy with three levels. The top-level is Division, followed by Group and then BusinessUnit. This means that several BusinessUnits below belong to one Group and several Groups belong to one Division
![enter image description here](https://help.zebrabi.com/wp-content/uploads/file-O6TNEJwTBv.gif)
	 - **Data Types**: Here are some of the common data types in Power BI:
		 - Binary
		 - True/false
		 - Fixed decimal number
		 - Date
		 - Date/time
		 - Decimal number
		 - Text
		 - Time
		 - Whole number
	 - **Data Refresh**: Data refresh is the process of updating the data in your Power BI report from the original data sources. It ensures that the information in your report is current and accurate. Data refresh is only applicable when the data source connection mode is **Import**, for other modes PowerBI is directly connected to the source so no refresh is required. Data refresh can be done manually or scheduled to occur automatically.
Here's how to perform data refresh in Power BI:
		 1. **Manual Refresh**:
			 - Open your Power BI report in Power BI Desktop
			 - Click on the "Refresh" button in the Home tab. This will update the data in your report based on the configured data sources
		 2. **Scheduled Refresh**:
			 - For published reports and dashboards, you can set up scheduled refresh in the Power BI Service (Power BI Online)
			 - In Power BI Service, go to the dataset settings for your report
			 - Configure the refresh frequency and specify the credentials for data sources that require authentication
			 - Power BI Service will automatically refresh the data according to the schedule you define. The allowed frequency depends on the Power BI subscription
		 3. **On-Premises Data Gateway**: If your data sources are located on-premises (behind a firewall), you can use the Power BI On-Premises Data Gateway to enable scheduled refresh for those data sources
![On-premise data gateway](https://learn.microsoft.com/en-us/power-bi/guidance/media/gateway-onprem-sizing/gateway-onprem-workload-cached-data.png)
 #### **Visualization**
 - **Visuals**
	 - **Core Visuals**: Power BI comes with many out-of-the box visuals. These Power BI visuals are available in the visualization pane of both Power BI Desktop and Power BI service.
![Screenshot of default the Power B I visualization pane as it appears in Power BI Desktop and Power B I service.](https://learn.microsoft.com/en-us/power-bi/developer/visuals/media/power-bi-custom-visuals/power-bi-visualizations.png)
Some of these are:
		 - **Card**: Display a single data value or KPI
		 - **Table**: Display data in a tabular format
		 - **Matrix**: Show data in a multi-row and multi-column format
		 - **Pie Chart**: Create a circular chart to represent data as a portion of a whole
		 - **Donut Chart**: Similar to a pie chart but with a hole in the center
		 - **Column Chart**: Display data in vertical columns
		 - **Bar Chart**: Display data in horizontal bars
		 - **Stacked Column Chart**: Show data in vertical columns, with each column divided into segments
		 - **Stacked Bar Chart**: Similar to a stacked column chart but using horizontal bars
		 - **Line Chart**: Represent data using lines and data points
		 - **Area Chart**: Similar to a line chart but with filled areas under the lines
		 - **Scatter Chart**: Display data as points on a 2D plane
		 - **Map**: Create geographical maps and display data by location
		 - **Treemap**: Visualize hierarchical data in nested rectangles
		 - **KPI Indicator**: Display key performance indicators with indicators like up and down arrows
		 - **Gauge**: Create gauge charts to show progress or ratios
		 - **Funnel Chart**: Visualize stages of a process or sales funnel
		 - **Multi-row card**: Show multiple values in a single card
	  - **Custom Visuals**
  - **Report**: A Power BI report is one or more pages of visualizations such as line charts, maps, and treemaps. 
  A report has the following technical characterstics:
	  - Is contained in a single workspace
	  - Can be associated with multiple dashboards within that workspace. Tiles pinned from that one report can appear on multiple dashboards
	  - Can be created using data from one dataset. Power BI Desktop can combine more than one data source into a single dataset in a report, and that report can be imported into Power BI
![PowerBI Report](https://learn.microsoft.com/en-us/power-bi/fundamentals/media/service-basic-concepts/power-bi-app-report.png)
  - **Dashboard**: A dashboard is something that can be created in the Power BI service. It's a single canvas that contains zero or more tiles and widgets. Each tile pinned from a report displays a single visualization that was created from a dataset and pinned to the dashboard. Entire report pages can also be pinned to a dashboard as a single tile. Dashboards serve the following purpose:
	  - To see, in one glance, all the information needed to make decisions
	  - To monitor the most-important information about your business
	  - To ensure all colleagues are on the same page, viewing and using the same information
	  - To monitor the health of a business or product or business unit or marketing campaign, and more
	  - To create a personalized view of a larger dashboard—all the metrics that matter to you
![Power Bi report, dashboard, tiles,app](https://k21academy.com/wp-content/uploads/2021/04/Report.Dashboard_Diagram-02-1024x564.png)
	A dashboard has the following technical characterstics:
	- Is associated with a single workspace
	- Can display visualizations from many different datasets
	- Can display visualizations from many different reports
	- Can display visualizations pinned from other tools (for example, Excel, Web etc.)
![Intro to dashboards for Power BI designers - Power BI | Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/create-reports/media/service-dashboards/power-bi-diagram.png)

	Relationship between dataset, report and dashboard:
![enter image description here](https://learn.microsoft.com/en-us/power-bi/fundamentals/media/service-basic-concepts/drawing3new.png)
 #### **Interaction**
  - **Filter**: Filters are a fundamental component that allow you to control and manipulate the data displayed in your reports and dashboards. Filters help focus on specific data points, analyze subsets of your data, and provide interactivity to your users. There are different types of filters in Power BI:
	  - **Visual-Level Filters**:
		  - These filters apply to individual visuals (charts, tables, etc.) on a report page
		  - They can be configured within the visual by selecting fields and  choosing filter criteria
		  - Visual-level filters allow you to control the data displayed in a single visual without affecting other visuals on the same page.
	  - **Page-Level Filters**:
		  - These filters apply to all visuals on a single report page
		  - They can be configured from the "Filters" pane, and they affect all visuals on that page
		  - Page-level filters are useful for setting a common context for all visuals on the page
	  - **Report-Level Filters**:
		  - These filters apply to all pages and visuals within a report
		  - They can be configured from the "Filters" pane, and they are available on all report pages
		  - Report-level filters are useful for global filtering that spans multiple pages
  - **Slicer**: Slicers are another way of filtering. They're displayed on the report page, and narrow the portion of the dataset that's shown in the other report visualizations. Slicers are typically used to:
	  - Display commonly used or important filters on the report canvas for easier access
	  - Make it easier to see the current filtered state without having to open a drop-down list
	  - Filter by columns that are unneeded and hidden in the data tables
	  - Create more focused reports by putting slicers next to important visuals
![enter image description here](https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-slicers/slicer2.gif)
  - **Cross-Filtering**: Cross-filtering allows you to filter data in one visual (removes data that doesn't apply) by selecting data in another visual. It establishes a relationship between visuals, such that the selection in one visual narrows down the data displayed in other visuals on the same report page. As an example, if you have a scatter plot that shows sales by product and a bar chart that displays sales by region, you can use cross-filtering to select a specific product in the scatter plot. This selection will then filter the bar chart to show sales for that product in various regions. For configuring cross filtering, check the section **"Cross filter direction"** documented above
![cross-filtering](https://learn.microsoft.com/en-us/power-bi/consumer/media/end-user-interactions/interactions.gif)
  - **Cross-Highlighting**: Cross-highlighting is a related feature to cross-filtering that highlights the data in other visuals without actually filtering it (retains all the original data points but dims the portion that doesn't apply to your selection). It provides a visual indication of the relationships between selected data points. Continuing with the previous example, when you select a product in the scatter plot using cross-highlighting, the corresponding data points in the bar chart (regions) will be highlighted. This helps you see how the selected product contributes to different regions' sales without changing what's displayed in the bar chart. Cross-highlighting is useful for maintaining context and showing how selections in one visual are related to the data in other visuals
![cross-highlighting](https://d13ot9o61jdzpp.cloudfront.net/images/pbi_cross_highlight.gif)
  - **Drill**: Drill-through and drill-down are interactive features in Power BI that allow you to explore and analyze data at different levels of detail, providing a more granular view of your data. These features are particularly useful for users who want to investigate specific data points and navigate through hierarchies or dimensions. Two types of drill interactions are possible:
	  - **Drill-Down/Drill-Up**: Drill-down allows users to explore data hierarchies or dimensions within a single visual. By clicking on a visual element, such as a chart bar, users can "drill down" to a more detailed level of data without leaving the current report page. To implement drill-down in Power BI, you need to create hierarchies in your data model, which can be defined using date fields, product categories, geographic regions, or any other dimension that has multiple levels. As an example you might have a bar chart showing annual sales by month. Users can drill down by clicking on a specific month, which will expand the chart to show monthly sales by day.
Ways to access the drill features:
		- One way is to hover over a visual to use the icons in the action bar. Turn on the drill-down option by selecting the single downward arrow ![Screenshot of visual with the drill-down on/off icon turned on.](https://learn.microsoft.com/en-us/power-bi/consumer/media/end-user-drill/power-bi-select-drill-icon.png). The grey background indicates that the drill-down option is turned on
		- Right-click a data point on the visual to open a menu with available options and select "Drill down"
		- Drill down all fields at once: Selecting the double arrow drill-down icon ![](https://learn.microsoft.com/en-us/power-bi/consumer/media/end-user-drill/power-bi-drill-icon3.png) takes you to the next level in the hierarchy. For example, if you're at the category level, you can drill down to the manufacturer level, then the segment level, and, finally, the product level for all categories.
		- Expand fields: The  **Expand**  option ![](https://learn.microsoft.com/en-us/power-bi/consumer/media/end-user-drill/power-bi-drill-icon6.png) adds another hierarchy level to the current view. If you're at the category level, which shows Rural and Urban, you can expand all current bars at the same time. The first time you expand, the manufacturer is added for both Rural and Urban. Expand again and, in addition to the manufacturer, segment data is added for both Rural and Urban
![drill down](https://i0.wp.com/sqldusty.com/wp-content/uploads/2015/10/funnelchartdrilldown.gif)
	  - **Drill-Through**: Drill-through allows you to create a path for users to "drill through" from one report page to another, typically showing more detailed information about a specific data point. It's often used to provide context or additional insights when users click on a particular visual element. You can set up drill-through actions by defining which fields or measures users can drill through and which report page they should navigate to when drilling through. As an example, you might have a high-level summary dashboard showing total sales by region. When a user clicks on a specific region, they can drill through to a detailed report page that displays sales by city, products, and other related information for that region. **Drill-through can be configured** by going on the drillthrough target page, in the **Build visual** section of the **Visualizations** pane, drag the field for which you want to enable drillthrough into the **Drill through** section
![configure drill through](https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-drillthrough/drillthrough-add-fields-here.png)
Drill-through in action:
![enter image description here](https://i0.wp.com/blog.crossjoin.co.uk/wp-content/uploads/2018/12/YTDDrillthrough.gif)
 #### **Security**
  - **RLS**: Row-Level Security (RLS) in Power BI is a security feature that allows you to control and restrict data access at the row level based on user roles. With RLS, you can ensure that different users or groups of users see only the data that is relevant to them, while other data remains hidden. This is particularly useful when you have a single dataset that needs to serve multiple user groups with different levels of access. If the ISV applications stores all their customers' data in one large dataset, it can use Row-level security (RLS) to protect each customer's data and acheive multi tenancy. This approach can be convenient for ISVs that have relatively few customers and small to medium-sized datasets
![RLS](https://learn.microsoft.com/en-us/power-bi/enterprise/media/service-admin-rls/enhanced-rls-example-default-editor.png)
  - **Service Principal**: A service principal (also known as a service account or app registration) is a security identity that allows applications, services, or automation scripts to access and interact with Power BI resources and data. Service Principals are the recommended authentication mehancism for PowerBI Embedded use cases. Service principals are created in Azure Active Directory (Azure AD), which is the identity and access management service used by Power BI. To create a service principal, you must register an application (also known as an app) in Azure AD. This app represents the service principal and defines its permissions and capabilities. You can assign permissions to the service principal based on what it needs to do within Power BI. These permissions can include read access to datasets, report creation, or data refresh capabilities etc. To use service principal and an application ID for embedded analytics, you take the following steps. Subsequent sections describe these steps in detail:
	  - Create an Azure AD app
	  - Create a secret for your Azure AD app
	  - Get the app's application ID and application secret
	  - Create an Azure AD security group
	  - Enable the Power BI service admin settings
	  - Add the service principal to your workspace
	  - Embed your content
For more details, refer to: https://learn.microsoft.com/en-us/power-bi/developer/embedded/embed-service-principal
  - **Service Principal Profile**: Main objective of service principal profiles is to serve as an entity to help acheive multi tenancy efficiently (detailed below). A service principal profile is a profile created by a service principal. The ISV app calls the Power BI APIs using a service principal profile. Service principal profiles is a feature that makes it easier for you to manage organizational content in Power BI and use your capacities more efficiently. The ISV application service principal creates a different Power BI profile for each customer, or tenant. When a customer visits the ISV app, the app uses the corresponding profile to generate an embed token that will be used to render a report in the browser. Using service principal profiles enables the ISV app to host multiple customers on a single Power BI tenant. Each profile represents one customer in Power BI. In other words, each profile creates and manages Power BI content for one specific customer's data.
Service principal profiles are local accounts that are created within the context of Power BI. A service principal can use the Profiles REST API operation to create new service principal profiles. A service principal can create and manage its own set of service principal profiles for a custom application, as shown in the following diagram.
![enter image description here](https://learn.microsoft.com/en-us/power-bi/guidance/media/develop-scalable-multitenancy-apps-with-powerbi-embedding/service-principal-creates-service-principal-profiles.png)
Setting up your Power BI content involves the following steps (all the below steps can be done manually or be fully automated using Power BI REST APIs):
	  - Create a profile
	  - Set the profile permissions
	  - Create a workspace for each customer
	  - Import reports and datasets into the workspace
	  - Set the dataset connection details to connect to the customer's data
	  - Remove permissions from the service principal (optional, but helps with scalability)
	  - Embed a report into the application

![SPP](https://learn.microsoft.com/en-us/power-bi/guidance/media/develop-scalable-multitenancy-apps-with-powerbi-embedding/create-service-principal-profiles-for-each-customer-tenant.png)
 - **Multi-tenancy**: Multi-tenancy outlines the strategies to be used by an ISV or any other Power BI Embedded app owner with many customers to map and manage each customer's data as part of their Power BI embed for your customers solution. It allows for better customer data isolation and establish tighter security boundaries between customers. There are other strategies to acheive multi-tenancy like implementing **RLS (documented above)** based on customer/tenant field information but the recommened strategy for multi-tenancy is to have workspace isolation between customers and have a separate owner or authentication entity over each workspace. Until now, Power BI Embedded app owners and ISVs were able to deploy the embedded solution to production by using one of the following 2 options:
	  - Create one service principal for all their customers, where they have a Power BI limit of 1,000 workspaces per each service principal
	  - Create one service principal per each customer, where they have the burden of managing thousands of service principals
![enter image description here](https://learn.microsoft.com/en-us/power-bi/guidance/media/develop-scalable-multitenancy-apps-with-powerbi-embedding/set-up-powerbi-multitenancy-environment.png)

	Now, Power BI embedded users have a new method that allows a much larger number of customers per one service principal by introducing a new entity named service principal profile
![SPP2](https://www.encloud9.com/wp-content/uploads/2022/03/diagram-description-automatically-generated-980x543.png)
Power BI recognizes service principal profiles as first-class security principals. Just like a user account or a service principal, you can add service principal profiles to a workspace role (as an Admin or Member). You can also make it a dataset owner and the owner of data source credentials. For these reasons, creating a new service principal profile for each new customer tenant is a best practice.
The application can execute REST API calls by using the identity of a service principal profile. That means it can execute a sequence of REST API calls to provision and set up a new customer tenant:
	 - When a service principal profile creates a new workspace, Power BI automatically adds that profile as a workspace admin
	 - When a service principal profile imports a Power BI Desktop file to create a dataset, Power BI sets that profile as the dataset owner
	 - When a service principal profile sets data source credentials, Power BI sets that profile as the owner of the data source credentials

	Lets take an example where we need to set up a customer tenant for a customer named Tenant1. The first step makes a REST API call to create a service principal profile with its display name set to Tenant1. This call is made by using the identity of the service principal. All remaining set up steps use the service principal profile to complete the following tasks:
	- Create a workspace
	- Associate the workspace with a capacity
	- Import a Power BI Desktop file
	- Set dataset parameters
	- Set data source credentials
	- Set up scheduled data refresh
 #### **Management**
The Power BI Admin Portal is a web-based management interface provided by Microsoft that allows administrators to configure, monitor, and manage various aspects of Power BI within an organization. It provides a centralized location for administering Power BI services and resources. Here are some of the functions and features of the Power BI Admin Portal:
-  **Access Control and Permissions**: Administrators can manage user access and permissions for Power BI workspaces, datasets, reports, and dashboards. This includes the ability to assign users to different roles, such as members, contributors, or administrators.
-  **Usage Metrics and Auditing**: The Admin Portal provides usage metrics and auditing capabilities, allowing administrators to monitor user activity, view dashboards of usage patterns, and assess how Power BI is being used in the organization
-  **Service Health and Notifications**: You can access service health and status information to stay informed about any incidents or outages affecting Power BI. Additionally, you can set up notifications to receive updates on service incidents
-  **Capacity Management**: Administrators can manage and allocate dedicated capacity resources to ensure optimal performance and data refresh
-  **Content Management**: Administrators have control over Power BI workspaces, datasets, and reports, making it possible to organize, move, and administer content within the organization
-  **Gateway Management**: If on-premises data sources are connected to Power BI, administrators can manage and configure data gateways in the Admin Portal. Gateways are used to establish connections to on-premises data sources securely
-  **Security and Compliance**: Administrators can configure and enforce security and compliance policies, including data classification, data sensitivity labels, and data retention policies
![enter image description here](https://learn.microsoft.com/en-us/fabric/admin/media/portal-workspace/power-bi-admin-datasets-workspaces.png)
## PowerBI Embedded Overview
### Solutions
Two solutions are available:
- **Embed for customers (app owns data)**: Customers here are users of our application and they don't need to sign in using Power BI credentials or have any licenses to view the embedded content/analytics. It allows to build an app that authenticates itself against PowerBI using non-interactive authentication flow (i.e. without any prompts to the user, it does the authentication internally and presents the content to the end-user)
- **Embed for organization (user owns data)**: This one is intended for internal users of our organization that might have PowerBI licenses. It requires users to sign in to PowerBI using their own crendentials.

**For our scenario, we would be going with the first solution i.e. Embed for customers (app owns data)**
### Licensing (Embed for customers-app owns data)
For embedding and using PowerBI in our app in production, capacity needs to be purchased/licenses. Capacity in simpler terms is compute resources (cloud virtual machines) that are required to process workloads, such as report rendering and data refresh. These licenses allow to embed content for external users i.e. users need not have any PowerBI license and they can access the content through our app. Two types of capacity based licenses are available:
- **Embedded**
	- This license allows to embed content for external users i.e. users that do not have any PowerBI license can access the content through our app (even if they have their own credentials/licenses, app's authentication/license works)
	- This license mode is available with Power BI Embedded which is a  Azure resource and is available for purchase from the Azure portal
	- The node (compute resource) falls under A SKU category. A SKUs range from A1 to A8 (1 being the weakest, 8 being the most powerful). A4 to A8 are equivalent to P1 to P5 (see below) in terms of power
	- This capacity can be scaled up/down or paused/resumed
	- This is billed on an hourly basis
	- License mode for the specific workspace should be set to Embedded to activate this license
	- Azure subscription would be required (Azure's Pay-as-you-go subscription would work in our case. There’s no fee to maintain the Azure free account we would be only paying for the Embedded license/capacity that is purchased through Azure Portal)
	- Capacity can be managed through Azure Portal
	- Content creators still need a Power BI Pro license for report authoring, At least one Power BI Pro license is required for the  organization to be able author and publish content
- **Premium per capacity**
	- These licenses allow to embed content for external users and internal users 
	- This license mode is available with Power BI Premium which is available for purchase from the Microsoft 365 admin centre
	- The node (compute resource) falls under P SKU category. P SKUs range from P1 to P5 (1 being the weakest, 5 being the most powerful)
	- This capacity can not be paused/resumed. It can be scaled manually or through AutoScale feature
	- This is billed on an monthly basis
	- License mode for the specific workspace should be set to Premium to activate this license
	- Capacity can be managed through PowerBI Admin Portal and renewed through Microsoft 365 admin centre
	- Microsoft 365 subscription is liked required for this to be managed through Microsoft 365
	- Azure subscription would be required to managed authentication flow required for using this in embedded scenario
	- Content creators still need a Power BI Pro license for report authoring, At least one Power BI Pro license is required for the  organization to be able author and publish content
	- \* (not relevant for our case) This also includes license for on-prem PowerBI Report server

![SKU Configuration](https://drive.google.com/uc?export=view&id=1vp5avuai9-TwOGRoJ1vQLhoCGdXQSQun)

**For our scenario, we would be going with the first solution i.e. Embedded License (PowerBI Embedded) which should be cheaper and is recommended for our case**
### Authentication
For authentication flow in embedding, an embedding identity is required. Along with the embedding identity an Azure app needs to be registered tied to the embedding identity. An embedding identity can be:
- **Service Principal**
	Your app can use a service principal to acquire an Azure AD token. The security principal defines the access policy and permissions for the user/application in the Azure AD tenant. This enables core features such as authentication of the user/application during sign-in, and authorization during resource access. This method uses secrets or certificates for auth. When your app's embedding identity is a service principal, a Power BI tenant admin must first:
	- Enable use of service principals through PowerBI admin portal
	- Register a security group that contains them
-   **Master User**
	Your app can use a master user account to acquire an AD token. A master user account is a regular Azure AD user. It must also have either a Power BI Pro or Power BI Premium Per User (PPU) license and hence can access PowerBI Service, unlike the service principal. In Power BI, the account must belong to the workspace admin or member role to embed workspace content. Another consideration is that master user accounts can't require MFA.

#### Authentication Flow
Once the app user authenticates with the app, the app uses the embedding identity (service principal or master user) to acquire an Azure AD token by using a non-interactive authentication flow.

Once the app acquires an Azure AD token (using the Microsoft Authentication Library-MSAL), it caches and then uses it to generate an embed token (by using a Power BI REST API operation, which requires an **Azure AD token**). An embed token represents facts about Power BI content and how to access them, like:
- Claims to specific Power BI content
- Access level, which you set to view, create, or edit
- Token lifetime, which determines when the token expires
These tokens should be refreshed before they expire using the PowerBI REST APIs.

![Authentication Flow](https://drive.google.com/uc?export=view&id=1FeyEDhZeQmRRrtN5e2cw2DvTI7opZ30n)

**For our scenario, we would be going with the first solution i.e. Service Principal since it is more secure and is the recommended method for production**
### APIs
Power BI Embedded APIs provide programmatic access to Power BI capabilities, allowing developers to integrate Power BI content, such as reports and dashboards, into custom applications, websites, or portals. These APIs enables us to create, interact with, and manage Power BI content within our own applications. Following APIs are required to acheive a PowerBI Embedded Analytics solution:
 - **PowerBI REST API**: The Power BI REST APIs provide service endpoints for embedding, administration, governance and user resources.
With Power BI REST APIs you can do the following:
	- Manage Power BI content
	- Perform admin operations
	- Embed Power BI Content

	**REST Operation groups**
	- **Admin:** Operations for working with administrative tasks
	- **Apps:** Operations for working with Apps
	- **Available Features:**  Operations that return available features
	- **Capacities:**  Operations for working with capacities
	- **Dashboards:**  Operations for working with dashboards
	- **Dataflow Storage Accounts:** Operations for working with dataflow storage accounts
	- **Dataflows:** Operations for working with dataflows
	- **Datasets:**  Operations for working with datasets
	- **Embed Token:** Operations for working with embed tokens
	- **Gateways:**  Operations for working with gateways
	- **Groups:**  Operations for working with groups
	- **Imports:** Operations for working with imports
	- **Pipelines:** Operations for working with deployment pipelines
	- **Push Datasets:** Operations for working with push datasets
	- **Reports:** Operations for working with reports
	- **Template Apps:** Operations for working with Template Apps
	- **Users:** Operations for working with users

	For further details, refer to: https://learn.microsoft.com/en-us/rest/api/power-bi/
 - **PowerBI Client API**: The Power BI Client API is a client side library that allows you to programmatically control your embedded Power BI content, by using JavaScript or TypeScript. Use the client APIs to communicate between Power BI items (such as reports and dashboards) and the application code. This gives you the flexibility to build an end user experience according to your design.

	The Client APIs communicate with an embedded Power BI item, such as a report or dashboard. The iframe creates a separation between the hosting app and the Power BI item, making sure the data is secured.
	![enter image description here](https://learn.microsoft.com/en-us/javascript/docs-ref-conceptual/media/overview/client-sdk.png)
Client APIs are further divided into these categories:

	 - **powerbi-client**: The main Power BI Client library which includes all the Power BI Client APIs except for powerbi-report-authoring. This library defines the classes for the different Power BI items that can be embedded. The powerbi-client library allows you to control the content you're embedding
	 - **powerbi-models**: Contains the object models for the Power BI Client APIs. For each model there is a TypeScript interface, a JSON schema definition, and a validation function to ensure a given object is a valid model
	 - **powerbi-report-authoring**: An extension of the client library. These APIs help with creating visuals and authoring the report after it's loaded. The powerbi-report-authoring library allows you to programmatically edit your embedded reports


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ3NDk4NTA4MywtMTc3NDM2NDMwNCw4Nz
E4NDg5NzEsLTE0NDI1MDk1NTQsMTI1ODgyMTA1NywtOTI5Njg2
ODksMjA1OTA3MzI1OCwxMjYyNzQ0MjUyLC02NTkwNzgxMjUsLT
ExMjAxNjQxMDUsMTQ4MjgwMjc4MywtMTU5MjE2MDE1MywyMDk0
NTg4MDMsLTE2MTg2NDE3NDAsMTM1Mzc0MDI1OSwxMjMyNjk3NT
Q3LDE2Nzg2NzgyMDUsMTE5NDMxMjI4NywxMjM1Nzg4NTgyLC0x
NDkxMTE4ODFdfQ==
-->
