type Field = {
    label: string;
    placeholder: string;
    validation?: {
        required: string;
        invalid?: string;
    };
};

export type Translations = {
    logo: string;
    home: {
        hero: {
            title: string;
            description: string;
            orderNow: string;
            learnMore: string;
        };
        bestSeller: {
            checkOut: string;
            OurBestSellers: string;
        };
        about: {
            ourStory: string;
            aboutUs: string;
            firstTitle: string,
            firstDescriptions: {
                beginning: string,
                one: string,
                two: string,
                three: string,
                four: string,
                five: string
            },
            firstFoot: string,
            secondTitle: string,
            secondDescriptions: {
                beginning: string,
                one: string,
                two: string,
                three: string,
                four: string,
                five: string
            },
            secondFoot: string,
            thirdTitle: string,
            thirdDescriptions: {
                beginning: string,
                one: string,
                two: string,
                three: string,
                four: string,
                five: string
            },
            thirdFoot: string
        };
        contact: {
            "Don't Hesitate": string;
            contactUs: string;
            getInTouch: string;
            description: string;
            ourLocation: string;
            emailUs: string;
            callUs: string;
            workingHours: string;
            followUs: string;
            sendUsMessage: string;
            formDescription: string;
            yourName: string;
            yourEmail: string;
            subject: string;
            yourMessage: string;
            sendMessage: string;
            address: string;
            email: string;
            phone: string;
            workingHoursValue: string;
        };
        offers: {
            whyChooseUs: string;
            securePrivacy: string;
            safePayments: string;
            deliveryGuarantee: string;
            securityReminder: string;
            lightningDeals: string;
            limitedTimeOffer: string;
        };
        specials: {
            title: string;
            orderNow: string;
            offers: {
                title: string;
                description: string;
                code: string;
            }[];
        };
    };
    navbar: {
        home: string;
        about: string;
        menu: string;
        offers?: string;
        orders?: string;
        favorites?: string;
        account?: string;
        contact: string;
        login: string;
        register: string;
        signOut: string;
        profile: string;
        admin: string;
    };
    auth: {
        login: {
            title: string;
            name: Field;
            email: Field;
            password: Field;
            submit: string;
            authPrompt: {
                message: string;
                signUpLinkText: string;
            };
        };
        register: {
            title: string;
            name: Field;
            email: Field;
            password: Field;
            confirmPassword: Field;
            submit: string;
            authPrompt: {
                message: string;
                loginLinkText: string;
            };
        };
    };
    validation: {
        nameRequired: string;
        validEmail: string;
        passwordMinLength: string;
        passwordMaxLength: string;
        confirmPasswordRequired: string;
        passwordMismatch: string;
    };
    menuItem: {
        addToCart: string;
    };
    messages: {
        userNotFound: string;
        incorrectPassword: string;
        loginSuccessful: string;
        unexpectedError: string;
        userAlreadyExists: string;
        accountCreated: string;
        updateProfileSucess: string;
        categoryAdded: string;
        updatecategorySucess: string;
        deleteCategorySucess: string;
        productAdded: string;
        updateProductSucess: string;
        deleteProductSucess: string;
        updateUserSucess: string;
        deleteUserSucess: string;
    };
    cart: {
        title: string;
        noItemsInCart: string;
        orderSummary: string;
        emptyTitle: string;
        emptyDescription: string;
        size: string;
        extras: string;
        subtotal: string;
        delivery: string;
        total: string;
        checkout: {
            emailAddress: string;
            phoneNumber: string;
            deliveryAddress: string;
            postalCode: string;
            city: string;
            country: string;
            processing: string;
            pay: string;
            agreement: string;
        };
    };
    menu: {
        title: string;
        subtitle: string;
        searchMenu: string;
        searchPlaceholder: string;
        filterByCategory: string;
        dietaryOptions: string;
        allCategories: string;
        addToCart: string;
        pickYourSize: string;
        anyExtra: string;
        inCart: string;
        remove: string;
        numberOfOrders: string;
        productNotFound: string;
        errorLoadingProduct: string;
    };
    profile: {
        title: string;
        form: {
            name: Field;
            email: Field;
            phone: Field;
            address: Field;
            postalCode: Field;
            city: Field;
            country: Field;
        };
    };
    admin: {
        tabs: {
            profile: string;
            categories: string;
            menuItems: string;
            users: string;
            orders: string;
        };
        categories: {
            form: {
                editName: string;
                name: {
                    label: string;
                    placeholder: string;
                    validation: {
                        required: string;
                    };
                };
            };
        };
        "menu-items": {
            addItemSize: string;
            createNewMenuItem: string;
            addExtraItem: string;
            menuOption: {
                name: string;
                extraPrice: string;
            };
            form: {
                name: {
                    label: string;
                    placeholder: string;
                    validation: {
                        required: string;
                    };
                };
                description: {
                    label: string;
                    placeholder: string;
                    validation: {
                        required: string;
                    };
                };
                basePrice: {
                    label: string;
                    placeholder: string;
                    validation: {
                        required: string;
                    };
                };
                category: {
                    validation: {
                        required: string;
                    };
                };
                image: {
                    validation: {
                        required: string;
                    };
                };
            };
        };
    };
    sizes: string;
    extrasIngredients: string;
    delete: string;
    cancel: string;
    create: string;
    save: string;
    category: string;
    copyRight: string;
    noProductsFound: string;
    orderTracking?: {
        title: string;
        orderPlaced: string;
        thankYou: string;
        orderReference: string;
        status: string;
        deliveryAddress: string;
        contact: string;
        items: string;
        subtotal: string;
        deliveryFee: string;
        total: string;
        orderNotFound: string;
        orderNotFoundDesc: string;
        backToMenu: string;
        statuses: Record<string, string>;
    };
};
