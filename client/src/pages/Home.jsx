import { useState, useEffect } from 'react';


// Use a placeholder background image
const backgroundImage = '../../public/images/blogApp-welcome.jpg';

const Home = () => {
    const [currentView, setCurrentView] = useState('home');
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    
    // Initialize state from localStorage if available
    const [archivedPosts, setArchivedPosts] = useState(() => {
        const savedPosts = localStorage.getItem('archivedPosts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });
    
    const [starredPosts, setStarredPosts] = useState(() => {
        const savedStarred = localStorage.getItem('starredPosts');
        return savedStarred ? JSON.parse(savedStarred) : [];
    });
    
    // Save to localStorage whenever posts change
    useEffect(() => {
        localStorage.setItem('archivedPosts', JSON.stringify(archivedPosts));
    }, [archivedPosts]);

    useEffect(() => {
        localStorage.setItem('starredPosts', JSON.stringify(starredPosts));
    }, [starredPosts]);
    
    const handleLogout = () => {
        // Only redirect to login page, don't clear the posts
        window.location.href = '/login';
    };
    
    const handlePublish = (e) => {
        e.preventDefault();
        const newBlogPost = {
            id: Date.now(),
            title: newPost.title,
            content: newPost.content,
            createdAt: new Date(),
            isStarred: false
        };
        
        setArchivedPosts(prev => [...prev, newBlogPost]);
        setNewPost({ title: '', content: '' });
    };

    const handleStarPost = (postId) => {
        setArchivedPosts(prev => prev.map(post => {
            if (post.id === postId) {
                const updatedPost = { ...post, isStarred: !post.isStarred };
                // Update starred posts list WITHOUT duplicating
                if (updatedPost.isStarred) {
                    // Only add to starred if not already there
                    setStarredPosts(prev => {
                        if (!prev.some(p => p.id === postId)) {
                            return [...prev, updatedPost];
                        }
                        return prev;
                    });
                } else {
                    setStarredPosts(prev => prev.filter(p => p.id !== postId));
                }
                return updatedPost;
            }
            return post;
        }));
    };

    const handleDeletePost = (postId) => {
        if (currentView === 'starred') {
            // If deleting from starred view, only remove star status
            setArchivedPosts(prev => prev.map(post => {
                if (post.id === postId) {
                    return { ...post, isStarred: false };
                }
                return post;
            }));
            setStarredPosts(prev => prev.filter(post => post.id !== postId));
        } else {
            // If deleting from archive, remove completely
            setArchivedPosts(prev => prev.filter(post => post.id !== postId));
            setStarredPosts(prev => prev.filter(post => post.id !== postId));
        }
    };

    const getDisplayPosts = () => {
        switch (currentView) {
            case 'archive':
                return archivedPosts;
            case 'starred':
                return starredPosts;
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen w-full fixed inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="absolute inset-0 w-full min-h-screen overflow-auto">

            <div className="fixed top-4 left-4 flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm">
                    
                    <span className="text-xl font-bold text-gray-800">BlogSpace✒️</span>
                </div>
                {/* Logout Button */}
                <div className="absolute top-4 right-4">
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-lg transition-colors font-medium"
                    >
                        Logout
                    </button>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    {/* Header */}
                    <div className="bg-white/90 rounded-lg shadow-lg p-6 backdrop-blur-sm">
                        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Welcome to BlogSpace✒️</h1>
                        
                        {/* Navigation */}
                        <nav className="flex justify-center space-x-8 mb-8">
                            <button 
                                onClick={() => setCurrentView('home')}
                                className={`text-gray-800 hover:text-gray-600 font-medium px-4 py-2 rounded-md ${currentView === 'home' ? 'bg-blue-100 text-blue-600' : ''}`}
                            >
                                Home
                            </button>
                            <button 
                                onClick={() => setCurrentView('archive')}
                                className={`text-gray-800 hover:text-gray-600 font-medium px-4 py-2 rounded-md ${currentView === 'archive' ? 'bg-blue-100 text-blue-600' : ''}`}
                            >
                                Archive ({archivedPosts.length})
                            </button>
                            <button 
                                onClick={() => setCurrentView('starred')}
                                className={`text-gray-800 hover:text-gray-600 font-medium px-4 py-2 rounded-md ${currentView === 'starred' ? 'bg-blue-100 text-blue-600' : ''}`}
                            >
                                Starred ({starredPosts.length})
                            </button>
                        </nav>

                        {/* New Post Form - Only show on home view */}
                        {currentView === 'home' && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">Write Your Blog</h2>
                                <form onSubmit={handlePublish}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title:</label>
                                        <input
                                            type="text"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content:</label>
                                        <textarea
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows="6"
                                            required
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Publish
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Posts List - Show for archive and starred views */}
                        {currentView !== 'home' && (
                            <div className="space-y-6">
                                {getDisplayPosts().map((post) => (
                                    <div key={post.id} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-semibold">{post.title}</h2>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleStarPost(post.id)}
                                                    className={`p-2 rounded-full ${
                                                        post.isStarred ? 'text-yellow-500' : 'text-gray-400'
                                                    } hover:scale-110 transition-transform`}
                                                >
                                                    ★
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-600">{post.content}</p>
                                        <div className="mt-4 text-sm text-gray-500">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {getDisplayPosts().length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        {currentView === 'archive' ? 'No posts in archive yet.' : 'No starred posts yet.'}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-gray-600 pb-8">
                        © 2024 QuillSpace. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;