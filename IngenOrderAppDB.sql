USE [IngenOrderAppDB]
GO
ALTER TABLE [dbo].[Order] DROP CONSTRAINT [FK_dbo.Order_dbo.Product_Product_Reference]
GO
ALTER TABLE [dbo].[Order] DROP CONSTRAINT [FK_dbo.Order_dbo.OrderDelivery_Delivery_Reference]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 1/7/2018 1:01:40 AM ******/
DROP TABLE [dbo].[Product]
GO
/****** Object:  Table [dbo].[OrderDelivery]    Script Date: 1/7/2018 1:01:40 AM ******/
DROP TABLE [dbo].[OrderDelivery]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 1/7/2018 1:01:40 AM ******/
DROP TABLE [dbo].[Order]
GO
/****** Object:  Table [dbo].[Menu]    Script Date: 1/7/2018 1:01:40 AM ******/
DROP TABLE [dbo].[Menu]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 1/7/2018 1:01:40 AM ******/
DROP TABLE [dbo].[Customer]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 1/7/2018 1:01:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[Reference] [nvarchar](128) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[ContactPerson] [nvarchar](max) NULL,
	[Company] [nvarchar](max) NULL,
	[CountryCode] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[ContactNumber] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Website] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NULL,
	[LastOrdered] [datetime] NULL,
	[AccountType] [nvarchar](max) NULL,
	[PaymentType] [nvarchar](max) NULL,
	[Currency] [nvarchar](max) NULL,
	[AccountCatagory] [nvarchar](max) NULL,
	[Industry] [nvarchar](max) NULL,
	[EditingNotes] [nvarchar](max) NULL,
	[AdditionalInstructions] [nvarchar](max) NULL,
	[PreferredFileType] [nvarchar](max) NULL,
	[DiscountRate] [decimal](18, 2) NULL,
 CONSTRAINT [PK_dbo.Customer] PRIMARY KEY CLUSTERED 
(
	[Reference] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Menu]    Script Date: 1/7/2018 1:01:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MenuName] [nvarchar](50) NULL,
	[Caption] [nvarchar](50) NULL,
	[MenuType] [nvarchar](50) NULL,
	[Url] [nvarchar](100) NULL,
	[ControllerName] [nvarchar](50) NULL,
	[ActionName] [nvarchar](50) NULL,
	[Parameter] [nvarchar](100) NULL,
	[ParentId] [int] NULL,
	[OrderIndex] [int] NULL,
	[ClassName] [nvarchar](50) NULL,
	[SettingsGroup] [nvarchar](50) NULL,
	[Icon] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](100) NULL,
 CONSTRAINT [PK_dbo.Menu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Order]    Script Date: 1/7/2018 1:01:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[Reference] [nvarchar](128) NOT NULL,
	[OrderNo] [nvarchar](max) NOT NULL,
	[OrderDate] [datetime] NOT NULL,
	[Deadline] [datetime] NOT NULL,
	[AccountType] [nvarchar](max) NULL,
	[Instructions] [nvarchar](max) NULL,
	[AdditionalInstructions] [nvarchar](max) NULL,
	[NotefromCustomer] [nvarchar](max) NULL,
	[TotalImages] [int] NOT NULL,
	[Rate] [real] NOT NULL,
	[DiscountPercent] [real] NOT NULL,
	[TotalAmount] [real] NULL,
	[Currency] [nvarchar](max) NULL,
	[AmountInUSD] [real] NULL,
	[PaymentStatus] [nvarchar](max) NULL,
	[OrderStatus] [nvarchar](max) NULL,
	[PreferredFormat] [nvarchar](max) NULL,
	[PreferredFileType] [nvarchar](max) NULL,
	[Customer_Reference] [nvarchar](max) NULL,
	[Delivery_Reference] [nvarchar](128) NULL,
	[Product_Reference] [nvarchar](128) NULL,
 CONSTRAINT [PK_dbo.Order] PRIMARY KEY CLUSTERED 
(
	[Reference] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OrderDelivery]    Script Date: 1/7/2018 1:01:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDelivery](
	[Reference] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[AdditionalRate] [decimal](18, 2) NOT NULL,
	[Hours] [int] NOT NULL,
 CONSTRAINT [PK_dbo.OrderDelivery] PRIMARY KEY CLUSTERED 
(
	[Reference] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Product]    Script Date: 1/7/2018 1:01:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Reference] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Rate] [decimal](18, 2) NOT NULL,
	[Status] [nvarchar](max) NULL,
	[ServiceCategory] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.Product] PRIMARY KEY CLUSTERED 
(
	[Reference] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[Customer] ([Reference], [Code], [ContactPerson], [Company], [CountryCode], [Country], [ContactNumber], [Email], [Website], [Status], [LastOrdered], [AccountType], [PaymentType], [Currency], [AccountCatagory], [Industry], [EditingNotes], [AdditionalInstructions], [PreferredFileType], [DiscountRate]) VALUES (N'8db24766-6b2c-476c-95a6-05af5325ebe9', N'3456', N'riazul', N'asda', N'bh', N'Bahrain (‫البحرين‬‎)', N'sadsad', N'dsada@gmail.com', N'sad', N'Active', CAST(N'2018-01-05 00:00:00.000' AS DateTime), N'Pre Paid', N'Post Paid', N'BDT', NULL, NULL, NULL, NULL, N'PSD', CAST(45.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Menu] ON 

INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (1, N'Customers', N'Customers', N'Parent', NULL, N'Home', N'Index', NULL, NULL, 0, NULL, N'Parent', NULL, 1, NULL, NULL)
INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (2, N'Orders', N'Orders', N'Parent', NULL, N'OrderDeliveries', N'Index', NULL, NULL, 1, NULL, N'Parent', NULL, 1, NULL, NULL)
INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (3, N'Invoices', N'Invoices', N'Parent', NULL, N'Invoices', N'Index', NULL, NULL, 2, NULL, N'Parent', NULL, 1, NULL, NULL)
INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (4, N'Products', N'Products', N'Parent', NULL, N'Products', N'Index', NULL, NULL, 3, NULL, N'Parent', NULL, 1, NULL, NULL)
INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (6, N'Settings', N'Settings', N'Parent', NULL, N'Settings', N'Index', NULL, NULL, 4, N'dropdown', N'Parent', NULL, 1, NULL, NULL)
INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (8, N'Profile', N'Profile', N'Child', NULL, N'Profile', N'Index', NULL, 6, 0, NULL, N'Child', NULL, 1, NULL, NULL)
INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (9, N'Account', N'Account', N'Child', NULL, N'Account', N'LogOff', NULL, 6, 1, NULL, N'Child', NULL, 1, NULL, NULL)
INSERT [dbo].[Menu] ([Id], [MenuName], [Caption], [MenuType], [Url], [ControllerName], [ActionName], [Parameter], [ParentId], [OrderIndex], [ClassName], [SettingsGroup], [Icon], [IsActive], [CreatedDate], [CreatedBy]) VALUES (10, N'Change Pass', N'Change Pass', N'Child', NULL, N'Account', N'Manage', NULL, 9, 0, NULL, NULL, NULL, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Menu] OFF
INSERT [dbo].[OrderDelivery] ([Reference], [Name], [Description], [AdditionalRate], [Hours]) VALUES (N'1', N'Express', N'Images will be delivered within 4 hrs', CAST(200.00 AS Decimal(18, 2)), 4)
INSERT [dbo].[OrderDelivery] ([Reference], [Name], [Description], [AdditionalRate], [Hours]) VALUES (N'2', N'Next Day', N'Images will be delivered next morning', CAST(50.00 AS Decimal(18, 2)), 12)
INSERT [dbo].[OrderDelivery] ([Reference], [Name], [Description], [AdditionalRate], [Hours]) VALUES (N'3', N'Standard', N'Standard delivery within 24 hours', CAST(0.00 AS Decimal(18, 2)), 24)
INSERT [dbo].[Product] ([Reference], [Name], [Description], [Rate], [Status], [ServiceCategory]) VALUES (N'1', N'Clipping Path', N'Starting from 0.69 USD', CAST(0.69 AS Decimal(18, 2)), N'Active', N'E-Commerce')
INSERT [dbo].[Product] ([Reference], [Name], [Description], [Rate], [Status], [ServiceCategory]) VALUES (N'2', N'Masking', N'Starting from 1.29 USD', CAST(1.29 AS Decimal(18, 2)), N'Active', N'E-Commerce')
INSERT [dbo].[Product] ([Reference], [Name], [Description], [Rate], [Status], [ServiceCategory]) VALUES (N'3', N'Invisible Mannequin', N'Starting from 1.59 USD', CAST(1.59 AS Decimal(18, 2)), N'Active', N'E-Commerce')
INSERT [dbo].[Product] ([Reference], [Name], [Description], [Rate], [Status], [ServiceCategory]) VALUES (N'4', N'Remove Background', N'Starting from 0.39 USD', CAST(0.39 AS Decimal(18, 2)), N'Active', N'E-Commerce')
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Order_dbo.OrderDelivery_Delivery_Reference] FOREIGN KEY([Delivery_Reference])
REFERENCES [dbo].[OrderDelivery] ([Reference])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_dbo.Order_dbo.OrderDelivery_Delivery_Reference]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Order_dbo.Product_Product_Reference] FOREIGN KEY([Product_Reference])
REFERENCES [dbo].[Product] ([Reference])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_dbo.Order_dbo.Product_Product_Reference]
GO
