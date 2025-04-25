import main from "../index";

describe("Salesperson Total Sales Calculator", () => {
  it("calculates total sales for a salesperson with multiple orders", () => {
    const input = {
      order: {
        purchasingEntity: {
          PurchasingCompany: {
            company: {
              primarySalesperson: {
                value: "John Doe"
              }
            }
          }
        }
      },
      getOrderData: [
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 100
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "John Doe"
                }
              }
            }
          }
        },
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 200
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "John Doe"
                }
              }
            }
          }
        },
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 300
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "Jane Smith" // Different salesperson
                }
              }
            }
          }
        }
      ]
    };

    const expectedOutput = {
      totalSales: 300 // 100 + 200, excluding the 300 from Jane Smith
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("returns zero total when no orders match the salesperson", () => {
    const input = {
      order: {
        purchasingEntity: {
          PurchasingCompany: {
            company: {
              primarySalesperson: {
                value: "John Doe"
              }
            }
          }
        }
      },
      getOrderData: [
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 100
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "Jane Smith"
                }
              }
            }
          }
        },
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 200
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "Bob Johnson"
                }
              }
            }
          }
        }
      ]
    };

    const expectedOutput = {
      totalSales: 0
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("handles orders with missing or invalid data", () => {
    const input = {
      order: {
        purchasingEntity: {
          PurchasingCompany: {
            company: {
              primarySalesperson: {
                value: "John Doe"
              }
            }
          }
        }
      },
      getOrderData: [
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 100
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "John Doe"
                }
              }
            }
          }
        },
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 0 // Zero amount should be ignored
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "John Doe"
                }
              }
            }
          }
        },
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 200
            }
          },
          // Missing purchasingEntity data
        },
        {
          // Missing amount data
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "John Doe"
                }
              }
            }
          }
        },
        {
          purchasingEntity: null // Missing purchasingEntity data
        }
      ]
    };

    const expectedOutput = {
      totalSales: 100 // Only the first order should count
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });

  it("returns zero when salesperson is undefined", () => {
    const input = {
      order: {
        // Missing salesperson data
      },
      getOrderData: [
        {
          currentTotalPriceSet: {
            shopMoney: {
              amount: 100
            }
          },
          purchasingEntity: {
            PurchasingCompany: {
              company: {
                primarySalesperson: {
                  value: "John Doe"
                }
              }
            }
          }
        }
      ]
    };

    const expectedOutput = {
      totalSales: 0
    };

    const result = main(input);
    expect(result).toEqual(expectedOutput);
  });
});
