using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using QuizApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace QuizApp.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var context = new ApplicationDbContext(serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>(),
                serviceProvider.GetRequiredService<IOptions<OperationalStoreOptions>>());

            if (!context.Questions.Any())
            {                
                var questions = new List<Question>
                {
                    new Question
                    {
                        Content = "What is the world's most populated country?",
                        CorrectAnswer = "China",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "USA"
                            },
                            new Answer
                            {
                                Content = "Russia"
                            },
                            new Answer
                            {
                                Content = "India"
                            },
                            new Answer
                            {
                                Content = "China"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "Who was the original King of rock n' roll?",
                        CorrectAnswer = "Elvis Presley",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Michael Jackson"
                            },
                            new Answer
                            {
                                Content = "Mick Jagger"
                            },
                            new Answer
                            {
                                Content = "Elvis Presley",
                            },
                            new Answer
                            {
                                Content = "Steven Tyler"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "What plant is traditionally the primary ingredient in wine?",
                        CorrectAnswer = "Grape",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Agave"
                            },
                            new Answer
                            {
                                Content = "Apple"
                            },
                            new Answer
                            {
                                Content = "Grape"
                            },
                            new Answer
                            {
                                Content = "Plum"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "The human brain communicates with the rest of the body through networks of what?",
                        CorrectAnswer = "Nerves",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Tendons"
                            },
                            new Answer
                            {
                                Content = "Nerves"
                            },
                            new Answer
                            {
                                Content = "Muscles"
                            },
                            new Answer
                            {
                                Content = "Bones"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "What chemical is added to U.S. water supplies in the hopes of improving dental health?",
                        CorrectAnswer = "Fluoride",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Chlorine"
                            },
                            new Answer
                            {
                                Content = "Fluoride"
                            },
                            new Answer
                            {
                                Content = "Bromine"
                            },
                            new Answer
                            {
                                Content = "Hydrogen"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "Newton is said to have been inspired by what to describe the theory of gravity?",
                        CorrectAnswer = "Apple",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Apple"
                            },
                            new Answer
                            {
                                Content = "Ladder"
                            },
                            new Answer
                            {
                                Content = "Hailstone"
                            },
                            new Answer
                            {
                                Content = "Rock"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "According to the Big Bang Theory, how did the universe begin?",
                        CorrectAnswer = "An explosion",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "A rain storm"
                            },
                            new Answer
                            {
                                Content = "A slow, calm expansion"
                            },
                            new Answer
                            {
                                Content = "A meteor shower"
                            },
                            new Answer
                            {
                                Content = "An explosion"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "Which of these foods was invented in Australia?",
                        CorrectAnswer = "Vegemite",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Vegemite"
                            },
                            new Answer
                            {
                                Content = "Pizza"
                            },
                            new Answer
                            {
                                Content = "Hot dogs"
                            },
                            new Answer
                            {
                                Content = "Croissant"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "In the Harry Potter series, Harry must battle which evil wizard?",
                        CorrectAnswer = "Voldemort",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Grindelwald"
                            },
                            new Answer
                            {
                                Content = "Dumbledore"
                            },
                            new Answer
                            {
                                Content = "Sirius Black"
                            },
                            new Answer
                            {
                                Content = "Voldemort"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "A pentagon is a polygon that has how many sides?",
                        CorrectAnswer = "Five",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Forty"
                            },
                            new Answer
                            {
                                Content = "Five"
                            },
                            new Answer
                            {
                                Content = "Fifty"
                            },
                            new Answer
                            {
                                Content = "Four"
                            }
                        }
                    }
                };
                context.Questions.AddRange(questions);
                await context.SaveChangesAsync();
            }
        }
    }
}
